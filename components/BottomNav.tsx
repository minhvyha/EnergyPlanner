'use client';

import { Crosshair, List, Calendar, CalendarCheck } from "lucide-react";

type Screen = 'today' | 'tasks' | 'focus' | 'week'

interface BottomNavProps {
  activeScreen: Screen
  onScreenChange: (screen: Screen) => void
}

export default function BottomNav({ activeScreen, onScreenChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white  border-black border-t-4 max-w-md mx-auto">
      <div className="flex items-center justify-around h-20 px-4">
        <button
          onClick={() => onScreenChange('today')}
          className="flex flex-col items-center gap-1 min-w-[60px]"
        >
          <CalendarCheck className={activeScreen === 'today' ? 'text-[#FDE047]' : 'text-[#909090]'} size={24} />
          <span className={`text-xs font-medium uppercase ${activeScreen === 'today' ? 'text-[#FDE047]' : 'text-[#909090]'}`}>
            Today
          </span>
        </button>

        <button
          onClick={() => onScreenChange('tasks')}
          className="flex flex-col items-center gap-1 min-w-[60px]"
        >
          <List className={activeScreen === 'tasks' ? 'text-[#FDE047]' : 'text-[#909090]'} size={24} />
          <span className={`text-xs font-medium uppercase ${activeScreen === 'tasks' ? 'text-[#FDE047]' : 'text-[#909090]'}`}>
            Tasks
          </span>
        </button>

        <button
          onClick={() => onScreenChange('focus')}
          className="flex flex-col items-center gap-1 min-w-[60px]"
        >
          <Crosshair className={activeScreen === 'focus' ? 'text-[#FDE047]' : 'text-[#909090]'} size={24} />
          <span className={`text-xs font-medium uppercase ${activeScreen === 'focus' ? 'text-[#FDE047]' : 'text-[#909090]'}`}>
            Focus
          </span>
        </button>

        <button
          onClick={() => onScreenChange('week')}
          className="flex flex-col items-center gap-1 min-w-[60px]"
        >
          <Calendar className={activeScreen === 'week' ? 'text-[#FDE047]' : 'text-[#909090]'} size={24} />
          <span className={`text-xs font-medium uppercase ${activeScreen === 'week' ? 'text-[#FDE047]' : 'text-[#909090]'}`}>
            Week
          </span>
        </button>
      </div>
    </div>
  )
}
