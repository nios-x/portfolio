"use client"

import { useEffect, useRef } from "react"

export default function FloatingBall() {
  const ballRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ball = ballRef.current
    if (!ball) return

    let x = Math.random() * window.innerWidth
    let y = Math.random() * window.innerHeight
    let vx = 0.4 + Math.random()
    let vy = 0.4 + Math.random()

    const animate = () => {
      x += vx
      y += vy

      // bounce from edges
      if (x <= 0 || x >= window.innerWidth - 40) vx *= -1
      if (y <= 0 || y >= window.innerHeight - 40) vy *= -1

      ball.style.transform = `translate(${x}px, ${y}px)`
      requestAnimationFrame(animate)
    }

    animate()

    // mouse repulsion
    const repel = (e: MouseEvent) => {
      const rect = ball.getBoundingClientRect()
      const dx = rect.left + 20 - e.clientX
      const dy = rect.top + 20 - e.clientY
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < 120) {
        vx += dx * 0.002
        vy += dy * 0.002
      }
    }

    window.addEventListener("mousemove", repel)
    return () => window.removeEventListener("mousemove", repel)
  }, [])

  return (
    <div
      ref={ballRef}
      className="fixed top-0 left-0 z-0 w-10 h-10 rounded-full
                 bg-gradient-to-br from-black via-zinc-700 to-zinc-400
                 opacity-20 blur-[1px]
                 pointer-events-none"
    />
  )
}
