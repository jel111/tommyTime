"use client"

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DayCardProps {
  day: string
  activities: string[]
  onUpdate: (activities: string[]) => void
}

export function DayCard({ day, activities, onUpdate }: DayCardProps) {
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
    'Monday': 'bg-red-100',
    'Tuesday': 'bg-yellow-100',
    'Wednesday': 'bg-green-100',
    'Thursday': 'bg-blue-100',
    'Friday': 'bg-indigo-100',
    'Saturday': 'bg-purple-100',
    'Sunday': 'bg-pink-100',
  }

  return (
    <Card key={`${day}-${activities.length}`} className={`${dayColors[day]} shadow-lg`}>
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

