import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.7,
  className
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  }

  const offset = directionMap[direction] || directionMap.up

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px', amount: 0.3 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
