import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function LightRays({ color = '#3B82F6', opacity = 0.08, speed = 0.3 }) {
  const canvasRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let time = 0
    const rays = 5

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.offsetWidth * dpr
      canvas.height = canvas.offsetHeight * dpr
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      time += 0.005 * speed
      const w = canvas.offsetWidth
      const h = canvas.offsetHeight
      ctx.clearRect(0, 0, w, h)

      for (let i = 0; i < rays; i++) {
        const angle = (i / rays) * Math.PI * 2 + time * 0.1
        const rayX = w / 2 + Math.cos(angle) * w * 0.3
        const rayY = -h * 0.2 + Math.sin(time * 0.3 + i) * h * 0.15

        const gradient = ctx.createRadialGradient(rayX, rayY, 0, rayX, rayY, Math.max(w, h) * 0.8)
        gradient.addColorStop(0, color)
        gradient.addColorStop(0.3, `${color}66`)
        gradient.addColorStop(0.6, `${color}11`)
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.globalAlpha = opacity * (0.5 + Math.sin(time * 0.5 + i) * 0.5)
        ctx.fillRect(0, 0, w, h)
      }

      animationId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [color, opacity, speed, reduceMotion])

  if (reduceMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900/10 via-transparent to-transparent" />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ display: 'block' }}
    />
  )
}
