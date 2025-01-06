'use client'

import { useState, useEffect } from 'react'

export const MouseGradient = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(
              600px circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(255, 255, 255, 0.08),
              transparent 40%
            )
          `
        }}
      />
      <div
        className="fixed inset-0 pointer-events-none bg-white/[0.1] dark:bg-black/[0.1] [background-image:radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.4)_1px,transparent_0)] [background-size:30px_30px] dark:[background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)]"
      />
    </>
  )
}
