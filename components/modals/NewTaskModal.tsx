'use client'

import { useState } from 'react'

interface NewTaskModalProps {
  onClose: () => void
  onSave: (task: {
    title: string
    description: string
    energyLevel: 'low' | 'med' | 'high'
    duration: string
    subject: string
  }) => void
}

export default function NewTaskModal({ onClose, onSave }: NewTaskModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [energyLevel, setEnergyLevel] = useState<'low' | 'med' | 'high'>('low')
  const [duration, setDuration] = useState('')
  const [subject, setSubject] = useState('')

  const handleSave = () => {
    if (!title.trim()) return
    
    onSave({
      title,
      description,
      energyLevel,
      duration: duration || '45 mins',
      subject,
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-[3px] border-black rounded-[24px] p-6 w-full max-w-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-black">New Task</h2>
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
            <label className="block text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wide">
              Task Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Biology Revision"
              className="w-full py-3 px-4 bg-white border-[3px] border-black rounded-[16px] text-black placeholder:text-[#909090] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Task Description */}
          <div>
            <label className="block text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wide">
              Task Description (Optional)
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Revise Topics 1 & 2"
              className="w-full py-3 px-4 bg-white border-[3px] border-black rounded-[16px] text-black placeholder:text-[#909090] focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Required Energy */}
          <div>
            <label className="block text-xs text-gray-500 font-semibold mb-3 uppercase tracking-wide">
              Required Energy
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setEnergyLevel('low')}
                className={`flex-1 py-3 px-4 rounded-[16px] border-[3px] border-black font-bold text-sm transition-all ${
                  energyLevel === 'low'
                    ? 'bg-[#95E9C1] '
                    : 'bg-white hover:bg-[#95E9C1]/30'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>⚡</span>
                  <span>LOW</span>
                </div>
              </button>
              <button
                onClick={() => setEnergyLevel('med')}
                className={`flex-1 py-3 px-4 rounded-[16px] border-[3px] border-black font-bold text-sm transition-all ${
                  energyLevel === 'med'
                    ? 'bg-[#FDE047] '
                    : 'bg-white hover:bg-[#FDE047]/30'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>⚡</span>
                  <span>MED</span>
                </div>
              </button>
              <button
                onClick={() => setEnergyLevel('high')}
                className={`flex-1 py-3 px-4 rounded-[16px] border-[3px] border-black font-bold text-sm transition-all ${
                  energyLevel === 'high'
                    ? 'bg-[#FF5A7C] '
                    : 'bg-white hover:bg-[#FF5A7C]/30'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  <span>⚡</span>
                  <span>HIGH</span>
                </div>
              </button>
            </div>
          </div>

          {/* Estimated Time and Subject */}
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wide">
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
                  className="w-full py-3 pl-10 pr-4 bg-white border-[3px] border-black rounded-[16px] text-black placeholder:text-[#909090] focus:outline-none focus:ring-2 focus:ring-black"
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
              <label className="block text-xs text-gray-500 font-semibold mb-2 uppercase tracking-wide">
                Subject
                <br />
                (Optional)
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. Biology"
                className="w-full py-3 px-4 bg-white border-[3px] border-black rounded-[16px] text-black placeholder:text-[#909090] focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={!title.trim()}
          className="w-full bg-[#FDE047] text-black font-bold py-3.5 px-6 rounded-[20px] border-[3px] border-black  hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover: mt-6"
        >
          Save
        </button>
      </div>
    </div>
  )
}
