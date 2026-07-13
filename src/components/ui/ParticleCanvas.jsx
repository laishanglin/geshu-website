import { useEffect, useRef } from 'react'
import { createParticleSystem } from '@/utils/particles'
import { PARTICLE_CONFIG } from '@/utils/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function ParticleCanvas() {
  const canvasRef = useRef(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) return
    const canvas = canvasRef.current
    if (!canvas) return

    const cleanup = createParticleSystem(canvas, {
      particleCount: PARTICLE_CONFIG.count,
      connectionDistance: PARTICLE_CONFIG.connectionDistance,
      mouseRadius: PARTICLE_CONFIG.mouseRadius,
      colors: PARTICLE_CONFIG.colors,
    })

    return cleanup
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
