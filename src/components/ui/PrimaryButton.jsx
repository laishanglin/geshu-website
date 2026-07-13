import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { cn } from '@/utils/cn'

export default function PrimaryButton({ children, href, variant = 'primary', className, onClick }) {
  const reduceMotion = useReducedMotion()

  const baseClasses = cn(
    'inline-flex items-center justify-center px-8 py-3.5 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer',
    variant === 'primary' && 'bg-brand-gradient text-white hover:shadow-glow hover:scale-105',
    variant === 'outline' && 'border border-brand-500/40 text-brand-300 hover:bg-brand-500/10 hover:border-brand-400',
    variant === 'ghost' && 'text-slate-400 hover:text-white hover:bg-white/5',
    className
  )

  const motionProps = reduceMotion ? {} : {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.98 },
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={baseClasses}
        onClick={(e) => {
          if (href.startsWith('#')) {
            e.preventDefault()
            const id = href.replace('#', '')
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
          }
          onClick?.(e)
        }}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button className={baseClasses} onClick={onClick} {...motionProps}>
      {children}
    </motion.button>
  )
}
