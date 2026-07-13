import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function TiltCard({ children, className, maxTilt = 8 }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [glow, setGlow] = useState({ x: 50, y: 50 })
  const ref = useRef(null)
  const reduceMotion = useReducedMotion()

  const handleMouseMove = (e) => {
    if (reduceMotion || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    setTilt({
      x: ((y - centerY) / centerY) * -maxTilt,
      y: ((x - centerX) / centerX) * maxTilt,
    })
    setGlow({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
    })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setGlow({ x: 50, y: 50 })
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      style={{ perspective: 1000, transformStyle: 'preserve-3d' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
