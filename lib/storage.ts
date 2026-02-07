import { getDefaultTasksForEnergy } from "./defaultTasks";

export interface Task {
  id: number;
  title: string;
  description: string;
  duration: string;
  subject: string;
  energyLevel: "low" | "med" | "high";
  checked?: boolean;
  inFocus?: boolean;
  isDefault?: boolean; // <- new flag to mark generated default tasks
}

export interface EnergyLevels {
  mental: number;
  physical: number;
  emotional: number;
  level: "LOW" | "MED" | "HIGH";
  timestamp: number;
}

export interface DailyData {
  date: string;
  tasks: Task[];
  completedTaskCount: number;
  energyLevel?: EnergyLevels;
  energyCheckIns?: EnergyLevels[]; // Track multiple check-ins per day
}

export interface WeekData {
  [date: string]: DailyData;
}

const WEEK_DATA_KEY = "energy_planner_week_data";
const CURRENT_DATE_KEY = "energy_planner_current_date";
const INITIALIZED_KEY = "energy_planner_initialized";

// Helper to get today's date string
const getTodayString = (): string => {
  const today = new Date();
  return today.toISOString().split("T")[0]; // YYYY-MM-DD
};

// Helper to get the start of the week (Monday)
const getWeekStart = (date: Date): string => {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
  const monday = new Date(date.setDate(diff));
  return monday.toISOString().split("T")[0];
};
// Helper: compute overall level from numeric components (10-bar scale)
const computeEnergyLevel = (
  mental: number,
  physical: number,
  emotional: number,
): EnergyLevels => {
  const totalScore = mental + physical + emotional;
  // Thresholds based on cumulative 10-bar scale (0-30 range)
  const level: EnergyLevels["level"] =
    totalScore <= 10 ? "LOW" : totalScore <= 20 ? "MED" : "HIGH";

  return {
    mental,
    physical,
    emotional,
    level,
    timestamp: Date.now(),
  };
};

// Helper: calculate average energy level from multiple check-ins
const calculateAverageEnergy = (
  checkIns: EnergyLevels[],
): EnergyLevels | undefined => {
  if (!checkIns || checkIns.length === 0) return undefined;

  const avgMental = Math.round(
    checkIns.reduce((sum, c) => sum + c.mental, 0) / checkIns.length,
  );
  const avgPhysical = Math.round(
    checkIns.reduce((sum, c) => sum + c.physical, 0) / checkIns.length,
  );
  const avgEmotional = Math.round(
    checkIns.reduce((sum, c) => sum + c.emotional, 0) / checkIns.length,
  );

  return computeEnergyLevel(avgMental, avgPhysical, avgEmotional);
};
const inferEnergyFromTasks = (tasks: Task[]) => {
  const totalTasks = tasks.length;
  const totalFocus = tasks.filter((t) => t.inFocus).length;
  const completedFocused = tasks.filter((t) => t.inFocus && t.checked).length;
  const completedAny = tasks.filter((t) => t.checked).length;

  // prefer focused tasks ratio if there are any focused tasks, otherwise use overall completion ratio
  const ratio =
    totalFocus > 0
      ? completedFocused / totalFocus
      : totalTasks > 0
        ? completedAny / totalTasks
        : 0;

  const score = Math.round(ratio * 10); // 0..10 (10-bar scale)

  // derive three components from the single score with small offsets to make them not identical
  const mental = Math.max(0, Math.min(10, score));
  const physical = Math.max(0, Math.min(10, score - 1)); // slightly lower
  const emotional = Math.max(0, Math.min(10, score + 1)); // slightly higher

  return { mental, physical, emotional };
};

// Helper: create default tasks for given numeric energy components and mark them as default
const regenerateDefaultTasksForToday = (
  mental: number,
  physical: number,
  emotional: number,
): Task[] => {
  const defaultTasks = getDefaultTasksForEnergy(mental, physical, emotional);
  console.log(defaultTasks);
  return defaultTasks.map((dt) => ({
    ...dt,
    id: Date.now() + Math.random(),
    checked: false,
    inFocus: false,
    isDefault: true,
  }));
};

export const storage = {
  // Check and reset if new day or first time app opens
  checkAndResetIfNewDay: () => {
    if (typeof window === "undefined") return;

    const isFirstTime = !localStorage.getItem(INITIALIZED_KEY);
    const savedDate = localStorage.getItem(CURRENT_DATE_KEY);
    const today = getTodayString();

    if (isFirstTime || savedDate !== today) {
      // New day or first-time opening detected
      if (!isFirstTime && savedDate) {
        const weekData = storage.getWeekData();
        const prevDayData = weekData[savedDate] || {
          date: savedDate,
          tasks: [],
          completedTaskCount: 0,
        };
        if (prevDayData.completedTaskCount > 0) {
          weekData[savedDate] = prevDayData;
          storage.saveWeekData(weekData);
        }
      }

      // Get the last known energy level or use default
      const todayData = storage.getTodayData();
      const lastEnergyLevel = todayData.energyLevel ||
        todayData.energyCheckIns?.[todayData.energyCheckIns.length - 1] || {
          mental: 5,
          physical: 5,
          emotional: 5,
          level: "MED" as const,
          timestamp: Date.now(),
        };

      // Get default tasks based on energy levels and mark them as default
      const newDayTasks = regenerateDefaultTasksForToday(
        lastEnergyLevel.mental,
        lastEnergyLevel.physical,
        lastEnergyLevel.emotional,
      );

      storage.saveTodayData({
        date: today,
        tasks: newDayTasks,
        completedTaskCount: 0,
        energyLevel: lastEnergyLevel,
        energyCheckIns: [lastEnergyLevel],
      });

      localStorage.setItem(CURRENT_DATE_KEY, today);
      localStorage.setItem(INITIALIZED_KEY, "true");
    }
  },

  // Week data operations (unchanged)
  getWeekData: (): WeekData => {
    if (typeof window === "undefined") return {};
    const data = localStorage.getItem(WEEK_DATA_KEY);
    return data ? JSON.parse(data) : {};
  },

  saveWeekData: (weekData: WeekData) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(WEEK_DATA_KEY, JSON.stringify(weekData));
    }
  },

  // Today's data operations
  getTodayData: (): DailyData => {
    if (typeof window === "undefined")
      return { date: getTodayString(), tasks: [], completedTaskCount: 0 };
    const weekData = storage.getWeekData();
    const today = getTodayString();
    return weekData[today] || { date: today, tasks: [], completedTaskCount: 0 };
  },

  saveTodayData: (dailyData: DailyData) => {
    if (typeof window === "undefined") return;

    // If numeric components exist, compute a canonical EnergyLevels object
    if (
      dailyData.energyLevel &&
      typeof dailyData.energyLevel.mental === "number" &&
      typeof dailyData.energyLevel.physical === "number" &&
      typeof dailyData.energyLevel.emotional === "number"
    ) {
      dailyData.energyLevel = computeEnergyLevel(
        dailyData.energyLevel.mental,
        dailyData.energyLevel.physical,
        dailyData.energyLevel.emotional,
      );
    } else if (dailyData.energyLevel && !dailyData.energyLevel.timestamp) {
      // If an energyLevel exists but no timestamp/level, attempt to set timestamp
      dailyData.energyLevel.timestamp = Date.now();
    }

    // Ensure completedTaskCount exists / is accurate
    const tasksForCount = dailyData.tasks || [];
    const completedCount = tasksForCount.filter(
      (task) => task.checked && task.inFocus,
    ).length;
    dailyData.completedTaskCount =
      dailyData.completedTaskCount ?? completedCount;

    const weekData = storage.getWeekData();
    weekData[dailyData.date] = dailyData;
    storage.saveWeekData(weekData);
  },

  // Task operations
  getTasks: (): Task[] => {
    storage.checkAndResetIfNewDay();
    return storage.getTodayData().tasks;
  },

  saveTasks: (tasks: Task[]) => {
    const todayData = storage.getTodayData();
    const completedCount = tasks.filter(
      (task) => task.checked && task.inFocus,
    ).length;

    storage.saveTodayData({
      ...todayData,
      tasks,
      completedTaskCount: completedCount,
    });
  },

  addTask: (task: Omit<Task, "id">): Task => {
    const tasks = storage.getTasks();
    const newTask = {
      ...task,
      id: Date.now(),
      isDefault: task.isDefault ?? false, // user-added tasks should not be default
    };
    storage.saveTasks([...tasks, newTask]);
    return newTask;
  },

  updateTask: (id: number, updates: Partial<Task>) => {
    const tasks = storage.getTasks();
    const updatedTasks = tasks.map((task) => {
      if (task.id !== id) return task;

      // If a default task is being modified by the user, mark it as non-default
      const becameUserModified =
        task.isDefault &&
        (updates.inFocus ||
          updates.checked ||
          updates.title ||
          updates.description);
      return {
        ...task,
        ...updates,
        isDefault: becameUserModified ? false : task.isDefault,
      };
    });

    storage.saveTasks(updatedTasks);
  },

  deleteTask: (id: number) => {
    const tasks = storage.getTasks();
    storage.saveTasks(tasks.filter((task) => task.id !== id));
  },

  getFocusTasks: (): Task[] => {
    return storage.getTasks().filter((task) => task.inFocus);
  },

  // Energy operations
  getEnergyLevels: (): EnergyLevels | null => {
    storage.checkAndResetIfNewDay();
    const todayData = storage.getTodayData();

    if (todayData.energyCheckIns && todayData.energyCheckIns.length > 0) {
      return todayData.energyCheckIns[todayData.energyCheckIns.length - 1];
    }

    return todayData.energyLevel || null;
  },

  // Add a new energy check-in (supports multiple per day)
  addEnergyCheckIn: (energy: EnergyLevels) => {
    const todayData = storage.getTodayData();

    const checkIn = computeEnergyLevel(
      energy.mental,
      energy.physical,
      energy.emotional,
    );

    const checkIns = todayData.energyCheckIns || [];
    checkIns.push(checkIn);

    // Calculate average of all check-ins for today
    const averagedEnergy = calculateAverageEnergy(checkIns);

    // Regenerate default tasks using averaged numeric components if available
    let updatedTasks = todayData.tasks || [];
    if (energy && typeof energy.mental === "number") {
      const newDefaultTasks = regenerateDefaultTasksForToday(
        energy.mental,
        energy.physical,
        energy.emotional,
      );
      // remove old default tasks, keep user-created tasks
      const userTasks = updatedTasks.filter((t) => !t.isDefault);
      updatedTasks = [...userTasks, ...newDefaultTasks];
    }

    const completedCount = updatedTasks.filter(
      (task) => task.checked && task.inFocus,
    ).length;

    storage.saveTodayData({
      ...todayData,
      tasks: updatedTasks,
      completedTaskCount: completedCount,
      energyCheckIns: checkIns,
      energyLevel: averagedEnergy, // Store averaged value
    });
  },

  // Accept raw EnergyLevels (with numeric components) or a precomputed one.
  // This will compute level and timestamp automatically if numeric components are provided.
  saveEnergyLevels: (energy: EnergyLevels) => {
    const todayData = storage.getTodayData();

    let toSave: EnergyLevels;
    if (
      typeof energy.mental === "number" &&
      typeof energy.physical === "number" &&
      typeof energy.emotional === "number"
    ) {
      toSave = computeEnergyLevel(
        energy.mental,
        energy.physical,
        energy.emotional,
      );
    } else {
      // if caller passed a prepared EnergyLevels, ensure timestamp exists
      toSave = { ...energy, timestamp: energy.timestamp || Date.now() };
    }

    // If we have numeric components, regenerate default tasks
    let updatedTasks = todayData.tasks || [];
    if (
      typeof energy.mental === "number" &&
      typeof energy.physical === "number" &&
      typeof energy.emotional === "number"
    ) {
      const newDefaultTasks = regenerateDefaultTasksForToday(
        energy.mental,
        energy.physical,
        energy.emotional,
      );
      const userTasks = updatedTasks.filter((t) => !t.isDefault);
      updatedTasks = [...userTasks, ...newDefaultTasks];
    }

    const completedCount = updatedTasks.filter(
      (task) => task.checked && task.inFocus,
    ).length;

    storage.saveTodayData({
      ...todayData,
      tasks: updatedTasks,
      completedTaskCount: completedCount,
      energyLevel: toSave,
    });
  },

  // Get data for the current week (Mon-Sun)
  getWeekStats: () => {
    storage.checkAndResetIfNewDay();
    const weekData = storage.getWeekData();
    const today = new Date();
    const weekStart = getWeekStart(new Date(today));

    const stats = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart);
      date.setDate(date.getDate() + i);
      const dateString = date.toISOString().split("T")[0];

      const dayData = weekData[dateString];
      stats.push({
        day: ["M", "T", "W", "T", "F", "S", "S"][i],
        date: dateString,
        completedTasks: dayData?.completedTaskCount || 0,
        energyLevel: dayData?.energyLevel?.level || null,
      });
    }

    return stats;
  },
};
