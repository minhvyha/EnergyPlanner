export interface Task {
  id: number
  title: string
  description: string
  duration: string
  subject: string
  energyLevel: 'low' | 'med' | 'high'
  checked?: boolean
  inFocus?: boolean
}

export interface EnergyLevels {
  mental: number
  physical: number
  emotional: number
  level: 'LOW' | 'MED' | 'HIGH'
  timestamp: number
}

export interface DailyData {
  date: string
  tasks: Task[]
  completedTaskCount: number
  energyLevel?: EnergyLevels
}

export interface WeekData {
  [date: string]: DailyData
}

const WEEK_DATA_KEY = 'energy_planner_week_data'
const CURRENT_DATE_KEY = 'energy_planner_current_date'

// Helper to get today's date string
const getTodayString = (): string => {
  const today = new Date()
  return today.toISOString().split('T')[0] // YYYY-MM-DD
}

// Helper to get the start of the week (Monday)
const getWeekStart = (date: Date): string => {
  const day = date.getDay()
  const diff = date.getDate() - day + (day === 0 ? -6 : 1) // Adjust when day is Sunday
  const monday = new Date(date.setDate(diff))
  return monday.toISOString().split('T')[0]
}

export const storage = {
  // Check and reset if new day
  checkAndResetIfNewDay: () => {
    if (typeof window === 'undefined') return
    
    const savedDate = localStorage.getItem(CURRENT_DATE_KEY)
    const today = getTodayString()
    
    if (savedDate !== today) {
      // New day detected - save yesterday's completed count to weekly data
      const weekData = storage.getWeekData()
      const todayData = storage.getTodayData()
      
      if (savedDate && todayData.completedTaskCount > 0) {
        weekData[savedDate] = todayData
        storage.saveWeekData(weekData)
      }
      
      // Reset daily tasks but keep them unchecked for the new day
      const tasks = todayData.tasks.map(task => ({ ...task, checked: false }))
      storage.saveTodayData({
        date: today,
        tasks,
        completedTaskCount: 0,
        energyLevel: undefined,
      })
      
      localStorage.setItem(CURRENT_DATE_KEY, today)
    }
  },

  // Week data operations
  getWeekData: (): WeekData => {
    if (typeof window === 'undefined') return {}
    const data = localStorage.getItem(WEEK_DATA_KEY)
    return data ? JSON.parse(data) : {}
  },

  saveWeekData: (weekData: WeekData) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(WEEK_DATA_KEY, JSON.stringify(weekData))
    }
  },

  // Today's data operations
  getTodayData: (): DailyData => {
    if (typeof window === 'undefined') return { date: getTodayString(), tasks: [], completedTaskCount: 0 }
    
    const weekData = storage.getWeekData()
    const today = getTodayString()
    
    return weekData[today] || { date: today, tasks: [], completedTaskCount: 0 }
  },

  saveTodayData: (dailyData: DailyData) => {
    if (typeof window === 'undefined') return
    
    const weekData = storage.getWeekData()
    weekData[dailyData.date] = dailyData
    storage.saveWeekData(weekData)
  },

  // Task operations
  getTasks: (): Task[] => {
    storage.checkAndResetIfNewDay()
    return storage.getTodayData().tasks
  },

  saveTasks: (tasks: Task[]) => {
    const todayData = storage.getTodayData()
    const completedCount = tasks.filter(task => task.checked && task.inFocus).length
    
    storage.saveTodayData({
      ...todayData,
      tasks,
      completedTaskCount: completedCount,
    })
  },

  addTask: (task: Omit<Task, 'id'>): Task => {
    const tasks = storage.getTasks()
    const newTask = {
      ...task,
      id: Date.now(),
    }
    storage.saveTasks([...tasks, newTask])
    return newTask
  },

  updateTask: (id: number, updates: Partial<Task>) => {
    const tasks = storage.getTasks()
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, ...updates } : task
    )
    storage.saveTasks(updatedTasks)
  },

  deleteTask: (id: number) => {
    const tasks = storage.getTasks()
    storage.saveTasks(tasks.filter(task => task.id !== id))
  },

  getFocusTasks: (): Task[] => {
    return storage.getTasks().filter(task => task.inFocus)
  },

  // Energy operations
  getEnergyLevels: (): EnergyLevels | null => {
    storage.checkAndResetIfNewDay()
    return storage.getTodayData().energyLevel || null
  },

  saveEnergyLevels: (energy: EnergyLevels) => {
    const todayData = storage.getTodayData()
    storage.saveTodayData({
      ...todayData,
      energyLevel: energy,
    })
  },

  // Get data for the current week (Mon-Sun)
  getWeekStats: () => {
    storage.checkAndResetIfNewDay()
    const weekData = storage.getWeekData()
    const today = new Date()
    const weekStart = getWeekStart(new Date(today))
    
    const stats = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart)
      date.setDate(date.getDate() + i)
      const dateString = date.toISOString().split('T')[0]
      
      const dayData = weekData[dateString]
      stats.push({
        day: ['M', 'T', 'W', 'T', 'F', 'S', 'S'][i],
        date: dateString,
        completedTasks: dayData?.completedTaskCount || 0,
        energyLevel: dayData?.energyLevel?.level || null,
      })
    }
    
    return stats
  },
}
