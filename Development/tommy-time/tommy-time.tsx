"use client"

import { useState } from 'react'
import { DayCard } from '@/app/components/day-card'
import { Button } from '@/components/ui/button'

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const templates = {
  'School Day': ['Wake up', 'Breakfast', 'School', 'Homework', 'Play time', 'Dinner', 'Bedtime'],
  'Weekend': ['Wake up late', 'Cartoons', 'Play outside', 'Lunch', 'Family time', 'Dinner', 'Movie night'],
  'Special Day': ['Wake up', 'Birthday party', 'Open presents', 'Cake time', 'Play with friends', 'Family dinner']
}

export default function TommyTime() {
  const [schedule, setSchedule] = useState<Record<string, string[]>>(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tommyTimeSchedule')
      if (saved) {
        return JSON.parse(saved)
      }
    }
    // Default state if no saved data or on server
    return Object.fromEntries(daysOfWeek.map(day => [day, [] as string[]]))
  })

  const applyTemplate = (template: string) => {
    const newSchedule = {...schedule}
    daysOfWeek.forEach(day => {
      newSchedule[day] = [...templates[template as keyof typeof templates]]
    })
    setSchedule(newSchedule)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6 !text-gray-950">Tommy Time</h1>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2 !text-gray-950">Quick Templates:</h2>
        <div className="flex gap-2 flex-wrap">
          {Object.keys(templates).map(template => (
            <Button 
              key={template} 
              onClick={() => applyTemplate(template)}
              className="bg-green-500 hover:bg-green-600 text-white font-bold"
            >
              {template}
            </Button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {daysOfWeek.map(day => (
          <DayCard 
            key={day} 
            day={day} 
            activities={schedule[day]}
            onUpdate={(newActivities: string[]) => {
              setSchedule({...schedule, [day]: newActivities})
            }}
          />
        ))}
      </div>
    </div>
  )
}


