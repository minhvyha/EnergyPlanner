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
  energyCheckIns?: EnergyLevels[] // Track multiple check-ins per day
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
// Helper: compute overall level from numeric components (10-bar scale)
const computeEnergyLevel = (mental: number, physical: number, emotional: number): EnergyLevels => {
  const totalScore = mental + physical + emotional
  // Thresholds based on cumulative 10-bar scale (0-30 range)
  const level: EnergyLevels['level'] = totalScore <= 10 ? 'LOW' : totalScore <= 20 ? 'MED' : 'HIGH'

  return {
    mental,
    physical,
    emotional,
    level,
    timestamp: Date.now(),
  }
}

// Helper: calculate average energy level from multiple check-ins
const calculateAverageEnergy = (checkIns: EnergyLevels[]): EnergyLevels | undefined => {
  if (!checkIns || checkIns.length === 0) return undefined
  
  const avgMental = Math.round(checkIns.reduce((sum, c) => sum + c.mental, 0) / checkIns.length)
  const avgPhysical = Math.round(checkIns.reduce((sum, c) => sum + c.physical, 0) / checkIns.length)
  const avgEmotional = Math.round(checkIns.reduce((sum, c) => sum + c.emotional, 0) / checkIns.length)
  
  return computeEnergyLevel(avgMental, avgPhysical, avgEmotional)
}
const inferEnergyFromTasks = (tasks: Task[]) => {
  const totalTasks = tasks.length
  const totalFocus = tasks.filter(t => t.inFocus).length
  const completedFocused = tasks.filter(t => t.inFocus && t.checked).length
  const completedAny = tasks.filter(t => t.checked).length

  // prefer focused tasks ratio if there are any focused tasks, otherwise use overall completion ratio
  const ratio = totalFocus > 0
    ? (completedFocused / totalFocus)
    : (totalTasks > 0 ? (completedAny / totalTasks) : 0)

  const score = Math.round(ratio * 10) // 0..10 (10-bar scale)

  // derive three components from the single score with small offsets to make them not identical
  const mental = Math.max(0, Math.min(10, score))
  const physical = Math.max(0, Math.min(10, score - 1)) // slightly lower
  const emotional = Math.max(0, Math.min(10, score + 1)) // slightly higher

  return { mental, physical, emotional }
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

    // If numeric components exist, compute a canonical EnergyLevels object
    if (dailyData.energyLevel
        && typeof dailyData.energyLevel.mental === 'number'
        && typeof dailyData.energyLevel.physical === 'number'
        && typeof dailyData.energyLevel.emotional === 'number') {
      dailyData.energyLevel = computeEnergyLevel(
        dailyData.energyLevel.mental,
        dailyData.energyLevel.physical,
        dailyData.energyLevel.emotional,
      )
    } else if (dailyData.energyLevel && !dailyData.energyLevel.timestamp) {
      // If an energyLevel exists but no timestamp/level, attempt to set timestamp
      dailyData.energyLevel.timestamp = Date.now()
    }

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

    // saveTodayData will recompute energyLevel if numeric components exist
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

 // --- updateTask now infers and saves energy levels every time it's called ---
updateTask: (id: number, updates: Partial<Task>) => {
  const tasks = storage.getTasks()
  const updatedTasks = tasks.map(task =>
    task.id === id ? { ...task, ...updates } : task
  )
  // save tasks (this updates completedTaskCount etc)
  storage.saveTasks(updatedTasks)

  // infer numeric energy components from the updated tasks and save them
  const numericEnergy = inferEnergyFromTasks(updatedTasks)

  // saveEnergyLevels expects an EnergyLevels object, but it will recompute canonical fields
  // when numeric components are present. Cast to match the signature.
  storage.saveEnergyLevels(numericEnergy as unknown as EnergyLevels)
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
    const todayData = storage.getTodayData()
    
    // Return the LATEST check-in (most recent) for display purposes
    if (todayData.energyCheckIns && todayData.energyCheckIns.length > 0) {
      return todayData.energyCheckIns[todayData.energyCheckIns.length - 1]
    }
    
    return todayData.energyLevel || null
  },

  // Add a new energy check-in (supports multiple per day)
  addEnergyCheckIn: (energy: EnergyLevels) => {
    const todayData = storage.getTodayData()
    
    const checkIn = computeEnergyLevel(energy.mental, energy.physical, energy.emotional)
    
    const checkIns = todayData.energyCheckIns || []
    checkIns.push(checkIn)
    
    // Calculate average of all check-ins for today
    const averagedEnergy = calculateAverageEnergy(checkIns)
    
    storage.saveTodayData({
      ...todayData,
      energyCheckIns: checkIns,
      energyLevel: averagedEnergy, // Store averaged value
    })
  },

  // Accept raw EnergyLevels (with numeric components) or a precomputed one.
  // This will compute level and timestamp automatically if numeric components are provided.
  saveEnergyLevels: (energy: EnergyLevels) => {
    const todayData = storage.getTodayData()

    let toSave: EnergyLevels
    if (typeof energy.mental === 'number' && typeof energy.physical === 'number' && typeof energy.emotional === 'number') {
      toSave = computeEnergyLevel(energy.mental, energy.physical, energy.emotional)
    } else {
      // if caller passed a prepared EnergyLevels, ensure timestamp exists
      toSave = { ...energy, timestamp: energy.timestamp || Date.now() }
    }

    storage.saveTodayData({
      ...todayData,
      energyLevel: toSave,
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
