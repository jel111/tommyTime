"use client"

import TommyTime from './components/tommy-time'

export default function Home() {
  return (
    <main 
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("/assets/bg.jpg")',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        backgroundBlendMode: 'overlay'
      }}
    >
      <div className="backdrop-blur-sm bg-white/30 min-h-screen">
        <TommyTime />
      </div>
    </main>
  )
}

