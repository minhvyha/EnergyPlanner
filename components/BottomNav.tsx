'use client';

type Screen = 'today' | 'tasks' | 'focus' | 'week'

interface BottomNavProps {
  activeScreen: Screen
  onScreenChange: (screen: Screen) => void
}

export default function BottomNav({ activeScreen, onScreenChange }: BottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 max-w-md mx-auto">
      <div className="flex items-center justify-around h-20 px-4">
        <button
          onClick={() => onScreenChange('today')}
          className="flex flex-col items-center gap-1 min-w-[60px]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={activeScreen === 'today' ? 'text-[#FDE047]' : 'text-gray-400'}>
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="2"/>
            <path d="M8 14h2v2H8zM12 14h2v2h-2z" fill="currentColor"/>
          </svg>
          <span className={`text-xs font-medium uppercase ${activeScreen === 'today' ? 'text-[#FDE047]' : 'text-gray-400'}`}>
            Today
          </span>
        </button>

        <button
          onClick={() => onScreenChange('tasks')}
          className="flex flex-col items-center gap-1 min-w-[60px]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={activeScreen === 'tasks' ? 'text-[#FDE047]' : 'text-gray-400'}>
            <circle cx="6" cy="6" r="2" fill="currentColor"/>
            <circle cx="6" cy="12" r="2" fill="currentColor"/>
            <circle cx="6" cy="18" r="2" fill="currentColor"/>
            <path d="M12 6h8M12 12h8M12 18h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <span className={`text-xs font-medium uppercase ${activeScreen === 'tasks' ? 'text-[#FDE047]' : 'text-gray-400'}`}>
            Tasks
          </span>
        </button>

        <button
          onClick={() => onScreenChange('focus')}
          className="flex flex-col items-center gap-1 min-w-[60px]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={activeScreen === 'focus' ? 'text-[#FDE047]' : 'text-gray-400'}>
            <circle cx="12" cy="12" r="3" fill="currentColor"/>
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span className={`text-xs font-medium uppercase ${activeScreen === 'focus' ? 'text-[#FDE047]' : 'text-gray-400'}`}>
            Focus
          </span>
        </button>

        <button
          onClick={() => onScreenChange('week')}
          className="flex flex-col items-center gap-1 min-w-[60px]"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className={activeScreen === 'week' ? 'text-[#FDE047]' : 'text-gray-400'}>
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2"/>
            <path d="M3 10h18M8 2v4M16 2v4" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <span className={`text-xs font-medium uppercase ${activeScreen === 'week' ? 'text-[#FDE047]' : 'text-gray-400'}`}>
            Week
          </span>
        </button>
      </div>
    </div>
  )
}
