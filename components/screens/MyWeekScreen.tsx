'use client'

import { useState, useEffect } from 'react'
import Header from "@/components/Header"
import { storage } from '@/lib/storage'



export default function MyWeekScreen() {
  const [weekStats, setWeekStats] = useState<ReturnType<typeof storage.getWeekStats>>([])

  useEffect(() => {
    const stats = storage.getWeekStats()
    setWeekStats(stats)
    console.log('Loaded week stats:', stats)

  }, [])

  const getEnergyColor = (level: string | null) => {
    if (!level) return 'text-gray-300'
    if (level === 'LOW') return 'text-[#FF5A7C]'
    if (level === 'MED') return 'text-[#FDE047]'
    if (level === 'HIGH') return 'text-[#39BAD1]'
    return 'text-gray-300'
  }

  const getEnergyLetter = (level: string | null) => {
    if (!level) return '-'
    return level[0] // L, M, or H
  }

  // Colors for Monday -> Sunday
  const DAY_COLORS = [
    '#FFE2E8', // Mon
    '#FFF0E2', // Tue
    '#FFF8D3', // Wed
    '#E0FFF0', // Thu
    '#D3F8FF', // Fri
    '#F5E7FF', // Sat
    '#FFE2F0'  // Sun
  ]

  const maxTasks = Math.max(...weekStats.map(s => s.completedTasks), 1)

  return (
    <div>
      <Header />

      <div className="px-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <h2 className="text-3xl font-bold text-black">My Week</h2>
        </div>

        {/* Week Overview */}
        <div className="bg-white border-[3px] border-black rounded-2xl p-5 mb-4 ">
          <div className="flex justify-around">
            {weekStats.map((stat, index) => (
              <div key={index} className="flex flex-col items-center gap-2">
                <span className="text-sm font-bold text-black">{stat.day}</span>
                <span className={`text-2xl font-bold ${getEnergyColor(stat.energyLevel)}`}>
                  {getEnergyLetter(stat.energyLevel)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Insights */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-black mb-3">Insights:</h3>
          <ul className="text-gray-700 font-medium text-xl list-disc list-inside ml-4">
            <li className="list-item ">
              You felt lowest at the end of the week
            </li>
            <li className="list-item ">
              You felt most focused in the evenings
            </li>
          </ul>
        </div>

        {/* Task Breakdown Chart */}
        <div className="mb-4">
          <h3 className="text-2xl font-bold text-black mb-4">Task Breakdown</h3>
          <div className="bg-white border-[3px] border-black rounded-2xl p-6 ">
            {/* grid with chart area and labels row */}
            <div className="grid grid-rows-[1fr_auto]">
              {/* Chart area */}
              <div className="relative flex items-end justify-center gap-2 h-40">
                {/* Baseline (the border between chart and labels) */}
                <div className="absolute left-0 right-0 bottom-0 border-t-[3px] border-black" />

                {/* Bars (each column is a fixed width so labels below align) */}
                {weekStats.map((stat, index) => {
                  const minHeight = 20
                  const maxHeight = 140
                  const height = stat.completedTasks > 0 
                    ? Math.max(minHeight, (stat.completedTasks / maxTasks) * maxHeight)
                    : 0

                  // pick color by index, fallback to the previous teal if out of range
                  const barColor = DAY_COLORS[index] ?? '#39BAD1'
                  
                  return (
                    <div key={index} className="w-7 flex flex-col items-center relative">
                      {/* Number above bar */}
                      {stat.completedTasks > 0 && (
                        <div
                          className="text-base font-bold text-black absolute"
                          style={{ bottom: `${height + 8}px`, left: 0, right: 0, textAlign: 'center' }}
                        >
                          {stat.completedTasks}
                        </div>
                      )}

                      {/* Bar */}
                      {stat.completedTasks > 0 && (
                        <div
                          className="w-7 border-[2px] border-black rounded-t-[8px]"
                          style={{ height: `${height}px`, backgroundColor: barColor }}
                        />
                      )}

                      {/* spacer so the bottom of the bars sits on the baseline */}

                    </div>
                  )
                })}
              </div>

              {/* Labels row - sits below the baseline */}
              <div className="flex justify-center gap-2 mt-2">
                {weekStats.map((stat, index) => (
                  <div key={index} className="w-7 text-center font-bold text-sm text-black">
                    {stat.day}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
