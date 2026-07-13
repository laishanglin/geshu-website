import { useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/utils/cn'

export default function SpotlightCard({ children, className, spotlightColor = 'rgba(59,130,246,0.15)' }) {
  const divRef = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [opacity, setOpacity] = useState(0)
  const reduceMotion = useReducedMotion()

  const handleMouseMove = useCallback((e) => {
    if (reduceMotion || !divRef.current) return
    const rect = divRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setOpacity(1)
  }, [reduceMotion])

  const handleMouseLeave = useCallback(() => {
    setOpacity(0)
  }, [])

  return (
    <motion.div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn('relative overflow-hidden rounded-2xl', className)}
      whileHover={reduceMotion ? {} : { y: -2 }}
      transition={{ duration: 0.3 }}
    >
      {/* Spotlight gradient that follows mouse */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {children}
    </motion.div>
  )
}
