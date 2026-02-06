'use client'

import { useState } from 'react'
import BoltIcon from '@mui/icons-material/Bolt';

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
      duration: duration ? `${duration} mins` : '45 mins',
      subject,
      energyLevel,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-white items-center flex flex-col border-4 border-black rounded-2xl px-8 py-12 w-full max-w-sm max-h-[90vh] overflow-y-auto">
        <div className="flex w-full justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-black">Edit Task</h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold text-black hover:opacity-70"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 w-full">
          {/* Task Name */}
          <div>
            <label className="block text-xs text-[#909090] font-semibold mb-2 uppercase tracking-wide">
              Task Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full py-3 px-4 text-xs bg-white border-[3px] border-black rounded-[10px] text-black placeholder:text-[#909090] focus:outline-none focus:ring-black"
            />
          </div>

          {/* Task Description */}
          <div>
            <label className="block text-xs text-[#909090] font-semibold mb-2 uppercase tracking-wide">
              Task Description (Optional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="e.g. Revise Topics 1 & 2"
              className="w-full py-3 px-4 text-xs bg-white border-[3px] border-black rounded-[10px] text-black placeholder:text-[#909090] focus:outline-none focus:ring-black resize-none"
            />
          </div>

          {/* Required Energy */}
          <div>
            <label className="block text-xs text-[#909090] font-semibold mb-3 uppercase tracking-wide">
              Required Energy
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setEnergyLevel('low')}
                className={`flex-1 p-2 rounded-[10px] border-[3px] border-[#95E9C1] text-[#95E9C1] font-bold transition-all ${
                  energyLevel === 'low'
                    ? 'bg-[#E0FFF0] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)]'
                    : 'bg-white hover:bg-[#95E9C1]/30'
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <BoltIcon style={{ color: '#95E9C1' }} />
                  <span>LOW</span>
                </div>
              </button>

              <button
                onClick={() => setEnergyLevel('med')}
                className={`flex-1 p-2 rounded-[10px] border-[3px] border-[#FDE047] text-[#FDE047] font-bold transition-all ${
                  energyLevel === 'med'
                    ? 'bg-[#FFF8D3] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)]'
                    : 'bg-white hover:bg-[#FFF8D3]/30'
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <BoltIcon style={{ color: '#FDE047' }} />
                  <span>MED</span>
                </div>
              </button>

              <button
                onClick={() => setEnergyLevel('high')}
                className={`flex-1 p-2 rounded-[10px] border-[3px] border-[#FF5A7C] text-[#FF5A7C] font-bold transition-all ${
                  energyLevel === 'high'
                    ? 'bg-[#FFE2E8] shadow-[3px_3px_0px_0px_rgba(0,0,0,0.25)]'
                    : 'bg-white hover:bg-[#FF5A7C]/30'
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-1">
                  <BoltIcon style={{ color: '#FF5A7C' }} />
                  <span>HIGH</span>
                </div>
              </button>
            </div>
          </div>

          {/* Estimated Time and Subject */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs text-[#909090] font-semibold mb-2 uppercase tracking-wide">
                Estimated Time
                <br />
                (Optional)
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="45 min"
                  className="w-full py-3 pl-10 pr-4 bg-white border-[3px] border-black rounded-[10px] text-black placeholder:text-[#909090] focus:outline-none"
                />
                <svg
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path strokeLinecap="round" strokeWidth="2" d="M12 6v6l4 2" />
                </svg>
              </div>
            </div>

            <div className="flex-1">
              <label className="block text-xs text-[#909090] font-semibold mb-2 uppercase tracking-wide">
                Subject
                <br />
                (Optional)
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Biology"
                className="w-full py-3 px-4 bg-white border-[3px] border-black rounded-[10px] text-black placeholder:text-[#909090] focus:outline-none focus:ring-black"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 w-full">
            <button
              onClick={handleSave}
              className="flex-1 bg-[#FFF4BC] text-black font-bold py-3.5 px-6 rounded-[20px] border-[3px] border-black hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Save
            </button>
            <button
              onClick={onDelete}
              className="flex-1 bg-[#FFE2E8] text-black font-bold py-3.5 px-6 rounded-[20px] border-[3px] border-black hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
