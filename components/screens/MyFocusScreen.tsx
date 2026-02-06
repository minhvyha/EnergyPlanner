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
      <div className="px-8">
        <div className="flex items-center justify-center gap-3 mb-4">
            <h2 className="text-3xl font-bold text-black">Right Now</h2>
          </div>

        <div className="mb-4">
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
            className="flex-1 bg-[#F5E7FF] text-black font-bold py-3.5 px-4 rounded-[20px] border-[3px] border-black  hover:translate-y-0.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)] transition-all"
          >
            + Task Library
          </button>
          <button
            onClick={() => setShowNewTaskModal(true)}
            className="flex-1 bg-[#FFF4BC] text-black font-bold py-3.5 px-4 rounded-[20px] border-[3px] border-black  hover:translate-y-0.5 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)] transition-all"
          >
            + New Task
          </button>
        </div>

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
