"use client"

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

const templates = {
  'School Day': ['Wake up', 'Breakfast', 'School', 'Homework/Snack', 'Play time', 'Dinner', 'Jammies/Bedtime'],
  'Weekend': ['Wake up late', 'Cartoons', 'Play outside', 'Lunch', 'Family time', 'Dinner', 'Movie'],
  'Special Day': ['Wake up', 'Party', 'Open presents', 'Cake time', 'Play with friends', 'Family dinner']
}

interface DayCardProps {
  day: string
  activities: string[]
  onUpdate: (activities: string[]) => void
}

function DayCard({ day, activities, onUpdate }: DayCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [newActivity, setNewActivity] = useState('')

  const addActivity = () => {
    if (newActivity.trim()) {
      onUpdate([...activities, newActivity.trim()])
      setNewActivity('')
    }
  }

  const removeActivity = (index: number) => {
    const newActivities = activities.filter((_, i) => i !== index)
    onUpdate(newActivities)
  }

  const dayColors: { [key: string]: string } = {
    'Monday': 'rgb(255, 220, 220)',    // Light red
    'Tuesday': 'rgb(65, 220, 101)',   // Light yellow
    'Wednesday': 'rgb(11, 207, 225)', // Light green
    'Thursday': 'rgb(129, 153, 255)',  // Light blue
    'Friday': 'rgb(0, 255, 165)',    // Light indigo
    'Saturday': 'rgb(245, 173, 0)',  // Light purple
    'Sunday': 'rgb(237, 255, 134)',    // Light pink
  }

  return (
    // <Card className={`${dayColors[day]} shadow-lg`}>
      <Card style={{ backgroundColor: dayColors[day] }} className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">{day}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {activities.map((activity, index) => (
            <li key={index} className="flex justify-between items-center">
              <span>{activity}</span>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => removeActivity(index)}
              >
                ✖
              </Button>
            </li>
          ))}
        </ul>
        {isEditing ? (
          <div className="mt-4 space-y-2">
            <Input
              type="text"
              value={newActivity}
              onChange={(e) => setNewActivity(e.target.value)}
              placeholder="New activity"
              className="w-full"
            />
            <div className="flex justify-between">
              <Button onClick={addActivity} className="bg-green-500 hover:bg-green-600">
                Add
              </Button>
              <Button onClick={() => setIsEditing(false)} variant="outline">
                Done
              </Button>
            </div>
          </div>
        ) : (
          <Button 
            onClick={() => setIsEditing(true)} 
            className="mt-4 w-full bg-blue-500 hover:bg-blue-600"
          >
            Edit Day
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

export default function TommyTime() {
  const [schedule, setSchedule] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tommyTimeSchedule')
      if (saved) {
        return JSON.parse(saved)
      }
    }
    return Object.fromEntries(daysOfWeek.map(day => [day, []]))
  })

  useEffect(() => {
    localStorage.setItem('tommyTimeSchedule', JSON.stringify(schedule))
  }, [schedule])

  const applyTemplate = (template: keyof typeof templates) => {
    const newSchedule = {...schedule}
    daysOfWeek.forEach(day => {
      newSchedule[day] = [...templates[template]]
    })
    setSchedule(newSchedule)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-6 text-slate-950">Tommy Time</h1>
      <div className="mb-4">
        <h2 className="text-2xl font-semibold mb-2 text-slate-950">Quick Templates:</h2>
        <div className="flex gap-2 flex-wrap">
          {Object.keys(templates).map(template => (
            <Button 
              key={template} 
              onClick={() => applyTemplate(template as keyof typeof templates)}
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
            onUpdate={(newActivities) => {
              setSchedule({...schedule, [day]: newActivities})
            }}
          />
        ))}
      </div>
    </div>
  )
}
