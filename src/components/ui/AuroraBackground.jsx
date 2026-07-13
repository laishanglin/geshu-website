import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Multi-layer animated background: drifting gradient blobs + particle network + grid.
 */
export default function AuroraBackground() {
  const canvasRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationId
    let time = 0
    let W, H // logical size

    const PARTICLE_COUNT = 90
    const particles = []

    class Particle {
      constructor(w, h) {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.vx = (Math.random() - 0.5) * 0.3
        this.vy = (Math.random() - 0.5) * 0.3
        this.radius = 1.2 + Math.random() * 2.2
        this.opacity = 0.3 + Math.random() * 0.5
        this.hue = Math.random() < 0.5 ? 210 + Math.random() * 20 : 185 + Math.random() * 15
      }
      update(w, h, mx, my) {
        this.x += this.vx
        this.y += this.vy
        if (this.x < -20) this.x = w + 20
        if (this.x > w + 20) this.x = -20
        if (this.y < -20) this.y = h + 20
        if (this.y > h + 20) this.y = -20
        if (mx != null && my != null) {
          const dx = mx - this.x, dy = my - this.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 160) {
            const f = (1 - dist / 160) * 0.02
            this.vx += dx * f; this.vy += dy * f
            const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
            if (spd > 1.2) { this.vx = (this.vx / spd) * 1.2; this.vy = (this.vy / spd) * 1.2 }
          }
        }
      }
      draw(ctx) {
        ctx.save()
        ctx.globalAlpha = this.opacity
        ctx.fillStyle = `hsla(${this.hue}, 70%, 65%, 1)`
        ctx.shadowColor = `hsla(${this.hue}, 80%, 60%, 0.6)`
        ctx.shadowBlur = this.radius * 3
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    // --- Sizing ---
    const getSize = () => {
      const rect = canvas.getBoundingClientRect()
      const w = rect.width || window.innerWidth
      const h = rect.height || window.innerHeight
      return { w, h }
    }

    const resize = () => {
      const { w, h } = getSize()
      W = w; H = h
      const dpr = window.devicePixelRatio || 1
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    // Initialize
    const initial = getSize()
    W = initial.w; H = initial.h
    resize()

    // Create particles with known size
    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle(W, H))

    let mouseX = null, mouseY = null

    const blobs = [
      { x: 0.25, y: 0.3, r: 0.35, hue: 215, speed: 0.03, amp: 0.04 },
      { x: 0.7, y: 0.6, r: 0.3, hue: 190, speed: 0.025, amp: 0.05 },
      { x: 0.5, y: 0.8, r: 0.28, hue: 225, speed: 0.035, amp: 0.03 },
    ]

    const animate = () => {
      time += 0.005

      ctx.clearRect(0, 0, W, H)

      // Layer 1: Drifting blobs
      blobs.forEach((b, i) => {
        const bx = W * (b.x + Math.sin(time * b.speed + i * 2) * b.amp)
        const by = H * (b.y + Math.cos(time * b.speed * 1.3 + i) * b.amp)
        const br = Math.max(W, H) * b.r
        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, br)
        grad.addColorStop(0, `hsla(${b.hue}, 80%, 55%, 0.06)`)
        grad.addColorStop(0.5, `hsla(${b.hue}, 70%, 50%, 0.03)`)
        grad.addColorStop(1, 'transparent')
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, W, H)
      })

      // Layer 2: Particles
      particles.forEach(p => { p.update(W, H, mouseX, mouseY); p.draw(ctx) })

      // Layer 3: Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            ctx.save()
            ctx.globalAlpha = (1 - dist / 130) * 0.08
            ctx.strokeStyle = '#60A5FA'
            ctx.lineWidth = 0.4
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
            ctx.restore()
          }
        }
      }

      // Layer 4: Dot grid
      ctx.save()
      ctx.globalAlpha = 0.03
      ctx.fillStyle = '#3B82F6'
      for (let gx = 80; gx < W; gx += 80)
        for (let gy = 80; gy < H; gy += 80)
          { ctx.beginPath(); ctx.arc(gx, gy, 1, 0, Math.PI * 2); ctx.fill() }
      ctx.restore()

      animationId = requestAnimationFrame(animate)
    }

    const onMouse = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }
    const onLeave = () => { mouseX = null; mouseY = null }

    canvas.addEventListener('mousemove', onMouse)
    canvas.addEventListener('mouseleave', onLeave)
    window.addEventListener('resize', resize)

    animate()

    return () => {
      cancelAnimationFrame(animationId)
      canvas.removeEventListener('mousemove', onMouse)
      canvas.removeEventListener('mouseleave', onLeave)
      window.removeEventListener('resize', resize)
    }
  }, [reduceMotion])

  if (reduceMotion) {
    return (
      <div className="absolute inset-0 bg-gradient-to-b from-[#060B14] via-[#0A1628] to-[#060B14]">
        <div className="absolute inset-0 bg-hero-radial" />
      </div>
    )
  }

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  )
}
