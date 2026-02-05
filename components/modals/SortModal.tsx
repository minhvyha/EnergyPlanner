'use client'

import { useState } from 'react'

interface SortModalProps {
  onClose: () => void
}

export default function SortModal({ onClose }: SortModalProps) {
  const [sortBy, setSortBy] = useState<'date' | 'energy' | 'duration'>('date')
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-[3px] border-black rounded-[24px] p-6 w-full max-w-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-black">Sort By</h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold text-black hover:opacity-70"
          >
            ✕
          </button>
        </div>

        <div className="space-y-4 mb-6">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className={`w-6 h-6 rounded-full border-[3px] border-black flex items-center justify-center ${
              sortBy === 'date' ? 'bg-[#95E9C1]' : 'bg-white'
            }`}>
              {sortBy === 'date' && <div className="w-3 h-3 rounded-full bg-black" />}
            </div>
            <span className="text-lg font-medium text-black">Date Added</span>
            <input
              type="radio"
              name="sortBy"
              value="date"
              checked={sortBy === 'date'}
              onChange={(e) => setSortBy(e.target.value as 'date')}
              className="sr-only"
            />
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <div className={`w-6 h-6 rounded-full border-[3px] border-black flex items-center justify-center ${
              sortBy === 'energy' ? 'bg-[#95E9C1]' : 'bg-white'
            }`}>
              {sortBy === 'energy' && <div className="w-3 h-3 rounded-full bg-black" />}
            </div>
            <span className="text-lg font-medium text-black">Energy Level</span>
            <input
              type="radio"
              name="sortBy"
              value="energy"
              checked={sortBy === 'energy'}
              onChange={(e) => setSortBy(e.target.value as 'energy')}
              className="sr-only"
            />
          </label>

          <label className="flex items-center gap-3 cursor-pointer">
            <div className={`w-6 h-6 rounded-full border-[3px] border-black flex items-center justify-center ${
              sortBy === 'duration' ? 'bg-[#95E9C1]' : 'bg-white'
            }`}>
              {sortBy === 'duration' && <div className="w-3 h-3 rounded-full bg-black" />}
            </div>
            <span className="text-lg font-medium text-black">Task Duration</span>
            <input
              type="radio"
              name="sortBy"
              value="duration"
              checked={sortBy === 'duration'}
              onChange={(e) => setSortBy(e.target.value as 'duration')}
              className="sr-only"
            />
          </label>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setOrder('asc')}
            className={`flex-1 py-2.5 px-4 rounded-[16px] border-[3px] border-black font-bold transition-colors ${
              order === 'asc' ? 'bg-white text-black' : 'bg-white text-black opacity-50'
            }`}
          >
            Ascending
          </button>
          <button
            onClick={() => setOrder('desc')}
            className={`flex-1 py-2.5 px-4 rounded-[16px] border-[3px] border-black font-bold transition-colors ${
              order === 'desc' ? 'bg-[#95E9C1] text-black' : 'bg-white text-black opacity-50'
            }`}
          >
            Descending
          </button>
        </div>

        <button
          onClick={onClose}
          className="w-full bg-[#FDE047] text-black font-bold py-3.5 px-6 rounded-[20px] border-[3px] border-black  hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          Apply
        </button>
      </div>
    </div>
  )
}
