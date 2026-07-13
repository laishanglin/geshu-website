import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/utils/cn'

export default function BlurText({ children, className, delay = 0, as: Tag = 'span' }) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return <Tag className={className}>{children}</Tag>
  }

  return (
    <motion.span
      initial={{ filter: 'blur(10px)', opacity: 0 }}
      animate={{ filter: 'blur(0px)', opacity: 1 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className={cn('inline-block', className)}
    >
      {children}
    </motion.span>
  )
}
