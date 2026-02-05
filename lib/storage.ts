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

const TASKS_KEY = 'energy_planner_tasks'
const ENERGY_KEY = 'energyLevels'

export const storage = {
  // Task operations
  getTasks: (): Task[] => {
    if (typeof window === 'undefined') return []
    const data = localStorage.getItem(TASKS_KEY)
    return data ? JSON.parse(data) : []
  },

  saveTasks: (tasks: Task[]) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks))
    }
  },

  addTask: (task: Omit<Task, 'id'>): Task => {
    const tasks = storage.getTasks()
    const newTask = {
      ...task,
      id: Date.now(), // Use timestamp for unique ID
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
    if (typeof window === 'undefined') return null
    const data = localStorage.getItem(ENERGY_KEY)
    return data ? JSON.parse(data) : null
  },

  saveEnergyLevels: (energy: EnergyLevels) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(ENERGY_KEY, JSON.stringify(energy))
    }
  },
}
