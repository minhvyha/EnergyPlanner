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

//   {
//     "title": "test",
//     "description": "testtesttesttesttesttesttest",
//     "energyLevel": "med",
//     "duration": "12",
//     "subject": "adsadadsd",
//     "inFocus": true,
//     "id": 1770370146875,
//     "checked": false
// }
  // set default tasks if there are none in storage for today's date
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]
    const existing = storage.getTasks()
    if (!existing) {
      const defaultTasks = [
        {
          title: "Morning Exercise",
          description: "30 minutes of yoga or jogging to start the day.",
          energyLevel: "med",
          duration: "30 mins",
          subject: "Health",
          inFocus: false,
          id: Date.now() + 1,
          checked: false
        }
      ]
    }
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
