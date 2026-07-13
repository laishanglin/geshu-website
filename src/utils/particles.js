/**
 * Particle system core logic for Hero section canvas background
 */

const DEFAULT_COLORS = ['#3B82F6', '#60A5FA', '#06B6D4', '#22D3EE']

class Particle {
  constructor(canvas, colors = DEFAULT_COLORS) {
    this.canvas = canvas
    this.x = Math.random() * canvas.width
    this.y = Math.random() * canvas.height
    this.vx = (Math.random() - 0.5) * 0.5
    this.vy = (Math.random() - 0.5) * 0.5
    this.radius = 1.5 + Math.random() * 1.5
    this.opacity = 0.3 + Math.random() * 0.5
    this.color = colors[Math.floor(Math.random() * colors.length)]
  }

  update(mouseX, mouseY, mouseRadius) {
    // Move particle
    this.x += this.vx
    this.y += this.vy

    // Wrap around edges
    if (this.x < -50) this.x = this.canvas.width + 50
    if (this.x > this.canvas.width + 50) this.x = -50
    if (this.y < -50) this.y = this.canvas.height + 50
    if (this.y > this.canvas.height + 50) this.y = -50

    // Mouse interaction: gently attract particles
    if (mouseX !== null && mouseY !== null) {
      const dx = mouseX - this.x
      const dy = mouseY - this.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < mouseRadius) {
        const force = (1 - dist / mouseRadius) * 0.03
        this.vx += dx * force
        this.vy += dy * force

        // Damp velocity
        const speed = Math.sqrt(this.vx * this.vx + this.vy * this.vy)
        if (speed > 1) {
          this.vx = (this.vx / speed) * 1
          this.vy = (this.vy / speed) * 1
        }
      }
    }
  }

  draw(ctx) {
    ctx.save()
    ctx.globalAlpha = this.opacity
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.fill()

    // Add a subtle glow
    ctx.globalAlpha = this.opacity * 0.3
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius * 2.5, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }
}

export function createParticleSystem(canvas, options = {}) {
  const {
    particleCount = 100,
    connectionDistance = 120,
    mouseRadius = 150,
    colors = DEFAULT_COLORS,
  } = options

  const ctx = canvas.getContext('2d')
  let particles = []
  let mouseX = null
  let mouseY = null
  let animationId = null
  let running = true

  function init() {
    particles = Array.from({ length: particleCount }, () => new Particle(canvas, colors))
  }

  function resize() {
    const dpr = window.devicePixelRatio || 1
    canvas.width = canvas.offsetWidth * dpr
    canvas.height = canvas.offsetHeight * dpr
    ctx.scale(dpr, dpr)
    // Reset particles after resize
    particles.forEach((p) => {
      p.canvas = { width: canvas.offsetWidth, height: canvas.offsetHeight }
      // Reclamp positions
      p.x = Math.min(p.x, canvas.offsetWidth)
      p.y = Math.min(p.y, canvas.offsetHeight)
    })
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)

        if (dist < connectionDistance) {
          const opacity = (1 - dist / connectionDistance) * 0.15
          ctx.save()
          ctx.globalAlpha = opacity
          ctx.strokeStyle = '#60A5FA'
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
          ctx.restore()
        }
      }
    }
  }

  function animate() {
    if (!running) return
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight)

    particles.forEach((p) => {
      p.update(mouseX, mouseY, mouseRadius)
      p.draw(ctx)
    })

    drawConnections()
    animationId = requestAnimationFrame(animate)
  }

  function handleMouseMove(e) {
    const rect = canvas.getBoundingClientRect()
    mouseX = e.clientX - rect.left
    mouseY = e.clientY - rect.top
  }

  function handleMouseLeave() {
    mouseX = null
    mouseY = null
  }

  function handleVisibilityChange() {
    if (document.hidden) {
      running = false
      if (animationId) cancelAnimationFrame(animationId)
    } else {
      running = true
      animate()
    }
  }

  // Setup
  resize()
  init()
  animate()

  // Event listeners
  canvas.addEventListener('mousemove', handleMouseMove)
  canvas.addEventListener('mouseleave', handleMouseLeave)
  window.addEventListener('resize', resize)
  document.addEventListener('visibilitychange', handleVisibilityChange)

  // Return cleanup function
  return () => {
    running = false
    if (animationId) cancelAnimationFrame(animationId)
    canvas.removeEventListener('mousemove', handleMouseMove)
    canvas.removeEventListener('mouseleave', handleMouseLeave)
    window.removeEventListener('resize', resize)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  }
}
