'use client'

import EnergyBadge from '@/components/EnergyBadge'
import type { Task } from '@/lib/storage'
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
interface TaskLibraryModalProps {
  onClose: () => void
  tasks: Task[]
  onAddToFocus: (id: number) => void
}

export default function TaskLibraryModal({ onClose, tasks, onAddToFocus }: TaskLibraryModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center">
      <div className="bg-white rounded-t-[30px] border-[3px] border-black w-full max-w-md max-h-[70vh] overflow-y-auto">
        {/* Top handle */}
        <div className="flex justify-center pt-4 pb-2">
          <button
            onClick={onClose}
            className="text-[#909090] hover:text-gray-600"
          >
            <ExpandLessOutlinedIcon style={{ fontSize: 32 }} />
 
          </button>
        </div>

        {/* Task list */}
        <div className="px-4 pb-6 space-y-4">
          {tasks.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No tasks in library. Create tasks to see them here.
            </p>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="bg-white rounded-[20px] border-[3px] border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                <h3 className="font-bold text-black text-base mb-1">{task.title}</h3>
                <p className="text-sm text-gray-500 mb-3">
                  {task.duration}
                  {task.subject && ` | ${task.subject}`}
                </p>
                
                <div className="flex items-center justify-between">
                  <EnergyBadge level={task.energyLevel} />
                  
                  <button
                    onClick={() => onAddToFocus(task.id)}
                    className="px-4 py-2 bg-[#F5E7FF] text-[#AA78CD] font-bold rounded-full border-[3px] border-[#AA78CD] hover:bg-[#9966bb] transition-colors"
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
