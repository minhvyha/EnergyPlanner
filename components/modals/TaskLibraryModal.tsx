'use client'

import EnergyBadge from '@/components/EnergyBadge'
import type { Task } from '@/lib/storage'

interface TaskLibraryModalProps {
  onClose: () => void
  tasks: Task[]
  onAddToFocus: (id: number) => void
}

export default function TaskLibraryModal({ onClose, tasks, onAddToFocus }: TaskLibraryModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[30px] border-[3px] border-black w-full max-w-md max-h-[70vh] overflow-y-auto">
        {/* Close button */}
        <div className="flex justify-end pt-4 px-4 pb-2">
          <button
            onClick={onClose}
            className="text-2xl font-bold text-black hover:text-gray-600 leading-none"
          >
            ×
          </button>
        </div>

        {/* Task list */}
        <div className="px-4 pb-6 space-y-4">
          {tasks.length === 0 ? (
            <p className="text-[#909090] text-center py-8">
              No tasks in library. Create tasks to see them here.
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-[20px] border-[3px] border-black p-4 "
              >
                <h3 className="font-bold text-black text-base mb-1">{task.title}</h3>
                <p className="text-sm text-[#909090] mb-3">
                  {task.duration}
                  {task.subject && ` | ${task.subject}`}
                </p>
                
                <div className="flex items-center justify-between">
                  <EnergyBadge level={task.energyLevel} />
                  
                  <button
                    onClick={() => onAddToFocus(task.id)}
                    className="px-4 py-2 bg-[#AA78CD] text-white text-sm font-bold rounded-full border-[2px] border-black hover:bg-[#9966bb] transition-colors"
                  >
                    + Add to My Focus
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
