'use client'

import { useState } from 'react'

interface Task {
  id: number
  title: string
  description?: string
  duration: string
  subject?: string
  energyLevel: 'low' | 'med' | 'high'
}

interface EditTaskModalProps {
  task: Task
  onClose: () => void
  onSave: (task: Task) => void
  onDelete: () => void
}

export default function EditTaskModal({ task, onClose, onSave, onDelete }: EditTaskModalProps) {
  const [title, setTitle] = useState(task.title)
  const [description, setDescription] = useState(task.description || '')
  const [energyLevel, setEnergyLevel] = useState<'low' | 'med' | 'high'>(task.energyLevel)
  const [duration, setDuration] = useState(task.duration.replace(' mins', ''))
  const [subject, setSubject] = useState(task.subject || '')

  const handleSave = () => {
    onSave({
      ...task,
      title,
      description,
      duration: `${duration} mins`,
      subject,
      energyLevel,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-[3px] border-black rounded-2xl p-6 w-full max-w-sm  max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Edit Task</h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold text-black hover:opacity-70"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4">
          {/* Task Name */}
          <div>
            <label className="block text-xs font-medium text-[#909090] uppercase mb-2">
              Task Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full py-3 px-4 bg-white border-[3px] border-black rounded-[16px] text-black focus:outline-none  focus:ring-black"
            />
          </div>

          {/* Task Description */}
          <div>
            <label className="block text-xs font-medium text-[#909090] uppercase mb-2">
              Task Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full py-3 px-4 bg-white border-[3px] border-black rounded-[16px] text-black focus:outline-none  focus:ring-black resize-none"
            />
          </div>

          {/* Required Energy */}
          <div>
            <label className="block text-xs font-medium text-[#909090] uppercase mb-2">
              Required Energy
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setEnergyLevel('low')}
                className={`flex-1 py-3 rounded-[16px] border-[3px] border-black font-bold transition-all ${
                  energyLevel === 'low'
                    ? 'bg-[#95E9C1] text-black '
                    : 'bg-white text-[#909090]'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                    <path d="M6.5 1L1 8h5l-.5 5 5.5-7H6l.5-5z" fill="currentColor" className={energyLevel === 'low' ? 'text-[#95E9C1]' : 'text-[#909090]'} />
                  </svg>
                  <span className="text-sm">LOW</span>
                </div>
              </button>
              <button
                onClick={() => setEnergyLevel('med')}
                className={`flex-1 py-3 rounded-[16px] border-[3px] border-black font-bold transition-all ${
                  energyLevel === 'med'
                    ? 'bg-[#FDE047] text-black '
                    : 'bg-white text-[#909090]'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                    <path d="M6.5 1L1 8h5l-.5 5 5.5-7H6l.5-5z" fill="currentColor" className={energyLevel === 'med' ? 'text-[#FDE047]' : 'text-[#909090]'} />
                  </svg>
                  <span className="text-sm">MED</span>
                </div>
              </button>
              <button
                onClick={() => setEnergyLevel('high')}
                className={`flex-1 py-3 rounded-[16px] border-[3px] border-black font-bold transition-all ${
                  energyLevel === 'high'
                    ? 'bg-[#FF5A7C] text-white '
                    : 'bg-white text-[#909090]'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <svg width="12" height="14" viewBox="0 0 12 14" fill="none">
                    <path d="M6.5 1L1 8h5l-.5 5 5.5-7H6l.5-5z" fill="currentColor" className={energyLevel === 'high' ? 'text-[#FF5A7C]' : 'text-[#909090]'} />
                  </svg>
                  <span className="text-sm">HIGH</span>
                </div>
              </button>
            </div>
          </div>

          {/* Estimated Time and Subject */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs font-medium text-[#909090] uppercase mb-2">
                Estimated Time
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="45 min"
                  className="w-full py-3 pl-10 pr-4 bg-white border-[3px] border-black rounded-[16px] text-black placeholder:text-[#909090] focus:outline-none  focus:ring-black"
                />
                <svg width="16" height="16" viewBox="0 0 16 16" className="absolute left-3 top-1/2 -translate-y-1/2 text-[#909090]">
                  <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                  <path d="M8 4v4l3 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-[#909090] uppercase mb-2">
                Subject
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Math"
                className="w-full py-3 px-4 bg-white border-[3px] border-black rounded-[16px] text-black placeholder:text-[#909090] focus:outline-none  focus:ring-black"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleSave}
              className="flex-1 bg-[#FDE047] text-black font-bold py-3.5 px-6 rounded-[20px] border-[3px] border-black  hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Save
            </button>
            <button
              onClick={onDelete}
              className="flex-1 bg-[#FFB6C6] text-black font-bold py-3.5 px-6 rounded-[20px] border-[3px] border-black  hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
