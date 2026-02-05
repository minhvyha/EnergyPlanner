'use client'

import { useState, useEffect } from 'react'

interface EnergyUpdateModalProps {
  onClose: () => void
  onUpdate: (level: 'LOW' | 'MED' | 'HIGH', values: { mental: number; physical: number; emotional: number }) => void
}

export default function EnergyUpdateModal({ onClose, onUpdate }: EnergyUpdateModalProps) {
  const [mentalFocus, setMentalFocus] = useState(50)
  const [physicalEnergy, setPhysicalEnergy] = useState(50)
  const [emotionalBandwidth, setEmotionalBandwidth] = useState(50)

  // Load saved energy levels on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('energyLevels')
      if (saved) {
        const data = JSON.parse(saved)
        setMentalFocus(data.mental || 50)
        setPhysicalEnergy(data.physical || 50)
        setEmotionalBandwidth(data.emotional || 50)
      }
    }
  }, [])

  const handleUpdate = () => {
    const average = (mentalFocus + physicalEnergy + emotionalBandwidth) / 3
    let level: 'LOW' | 'MED' | 'HIGH'
    if (average < 33) {
      level = 'LOW'
    } else if (average < 67) {
      level = 'MED'
    } else {
      level = 'HIGH'
    }
    
    // Save to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('energyLevels', JSON.stringify({
        mental: mentalFocus,
        physical: physicalEnergy,
        emotional: emotionalBandwidth,
        level,
        timestamp: Date.now()
      }))
    }
    
    onUpdate(level, {
      mental: mentalFocus,
      physical: physicalEnergy,
      emotional: emotionalBandwidth
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white border-[3px] border-black rounded-[24px] p-6 w-full max-w-sm shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-black text-center flex-1">
            How's your energy right now?
          </h2>
          <button
            onClick={onClose}
            className="text-2xl font-bold text-black hover:opacity-70"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6 mb-8">
          {/* Mental Focus */}
          <div className="bg-gray-50 border-[3px] border-black rounded-[20px] p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-black">Mental Focus</h3>
              <span className="text-2xl">🧠</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={mentalFocus}
              onChange={(e) => setMentalFocus(Number(e.target.value))}
              className="w-full h-2 bg-gray-300 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FDE047] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>LOW</span>
              <span>HIGH</span>
            </div>
          </div>

          {/* Physical Energy */}
          <div className="bg-gray-50 border-[3px] border-black rounded-[20px] p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-black">Physical Energy</h3>
              <span className="text-2xl">⚡</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={physicalEnergy}
              onChange={(e) => setPhysicalEnergy(Number(e.target.value))}
              className="w-full h-2 bg-gray-300 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FDE047] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>LOW</span>
              <span>HIGH</span>
            </div>
          </div>

          {/* Emotional Bandwidth */}
          <div className="bg-gray-50 border-[3px] border-black rounded-[20px] p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-black">Emotional Bandwidth</h3>
              <span className="text-2xl">💪</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={emotionalBandwidth}
              onChange={(e) => setEmotionalBandwidth(Number(e.target.value))}
              className="w-full h-2 bg-gray-300 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#FDE047] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-black [&::-webkit-slider-thumb]:cursor-pointer"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-2">
              <span>LOW</span>
              <span>HIGH</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleUpdate}
          className="w-full bg-[#FDE047] text-black font-bold py-3.5 px-6 rounded-[20px] border-[3px] border-black  hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          UPDATE
        </button>
      </div>
    </div>
  )
}
