'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/Header'
import TaskCard from '@/components/TaskCard'
import NewTaskModal from '@/components/modals/NewTaskModal'
import TaskLibraryModal from '@/components/modals/TaskLibraryModal'
import { storage } from '@/lib/storage'

export default function MyFocusScreen() {
  const [showNewTaskModal, setShowNewTaskModal] = useState(false)
  const [showTaskLibraryModal, setShowTaskLibraryModal] = useState(false)
  const [tasks, setTasks] = useState<ReturnType<typeof storage.getFocusTasks>>([])
  const [libraryTasks, setLibraryTasks] = useState<ReturnType<typeof storage.getTasks>>([])

  // Load focus tasks from localStorage
  useEffect(() => {
    setTasks(storage.getFocusTasks())
    // Load tasks that are NOT in focus
    const allTasks = storage.getTasks()
    setLibraryTasks(allTasks.filter(task => !task.inFocus))
  }, [])

  const handleCheckChange = (id: number, checked: boolean) => {
    storage.updateTask(id, { checked })
    setTasks(storage.getFocusTasks())
  }

  const handleNewTask = (taskData: {
    title: string
    description: string
    energyLevel: 'low' | 'med' | 'high'
    duration: string
    subject: string
  }) => {
    storage.addTask({
      ...taskData,
      checked: false,
      inFocus: true,
    })
    setTasks(storage.getFocusTasks())
    setShowNewTaskModal(false)
  }

  const handleAddToFocus = (id: number) => {
    storage.updateTask(id, { inFocus: true })
    setTasks(storage.getFocusTasks())
    // Update library tasks to remove the added one
    const allTasks = storage.getTasks()
    setLibraryTasks(allTasks.filter(task => !task.inFocus))
  }

  return (
    <>
      <div>
        <Header />
      </div>
      <div className="px-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-[#FFB6C6] rounded-full flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="#FF5A7C">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-black">My Focus</h2>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-bold text-black mb-4">Task List</h3>
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                {...task}
                showCheckbox
                onCheckChange={(checked) => handleCheckChange(task.id, checked)}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-3 pb-6">
          <button
            onClick={() => setShowTaskLibraryModal(true)}
            className="flex-1 bg-white text-black font-bold py-3.5 px-6 rounded-[20px] border-[3px] border-black  hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            + Task Library
          </button>
          <button
            onClick={() => setShowNewTaskModal(true)}
            className="flex-1 bg-[#FDE047] text-black font-bold py-3.5 px-6 rounded-[20px] border-[3px] border-black  hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
          >
            + New Task
          </button>
        </div>

        {/* Decorative elements */}
        <div className="fixed top-[420px] right-4 w-12 h-12 pointer-events-none">
          <svg viewBox="0 0 50 50" fill="#FDE047">
            <polygon points="25,2 30,18 47,18 33,28 38,44 25,34 12,44 17,28 3,18 20,18" />
          </svg>
        </div>
        <div className="fixed bottom-32 left-4 w-16 h-16 bg-[#95E9C1] rounded-full opacity-50 pointer-events-none" />
      </div>

      {showNewTaskModal && (
        <NewTaskModal
          onClose={() => setShowNewTaskModal(false)}
          onSave={handleNewTask}
        />
      )}

      {showTaskLibraryModal && (
        <TaskLibraryModal
          onClose={() => setShowTaskLibraryModal(false)}
          tasks={libraryTasks}
          onAddToFocus={handleAddToFocus}
        />
      )}
    </>
  )
}
