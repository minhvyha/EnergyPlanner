'use client'

import { useState, useEffect } from 'react'
import MyFocusScreen from '@/components/screens/MyFocusScreen'
import RightNowScreen from '@/components/screens/RightNowScreen'
import TaskLibraryScreen from '@/components/screens/TaskLibraryScreen'
import MyWeekScreen from '@/components/screens/MyWeekScreen'
import BottomNav from '@/components/BottomNav'
import { storage } from '@/lib/storage'

type Screen = 'today' | 'tasks' | 'focus' | 'week'

export default function Home() {
  const [activeScreen, setActiveScreen] = useState<Screen>('today')

  useEffect(() => {
    storage.checkAndResetIfNewDay()
  }, [])

  return (
    <div className="min-h-screen bg-[#FAFFFD] pb-20">
      <div className="max-w-md mx-auto">
        {activeScreen === 'today' && <RightNowScreen />}
        {activeScreen === 'tasks' && <TaskLibraryScreen />}
        {activeScreen === 'focus' && <MyFocusScreen />}
        {activeScreen === 'week' && <MyWeekScreen />}
        
        <BottomNav activeScreen={activeScreen} onScreenChange={setActiveScreen} />
      </div>
    </div>
  )
}
