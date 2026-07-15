import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function NewsCard({ item, index }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.a
      href={item.link}
      initial={reduceMotion ? {} : { opacity: 0, y: 30, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] }}
      className="group relative flex flex-col p-6 lg:p-8 rounded-2xl bg-[rgba(10,22,40,0.4)] border border-[rgba(59,130,246,0.06)] hover:bg-[rgba(10,22,40,0.7)] hover:border-brand-500/10 hover:-translate-y-1 transition-all duration-400 overflow-hidden h-full"
    >
      {/* Subtle hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-brand-500/[0.03] via-transparent to-accent-500/[0.03]" />

      <div className="relative z-10 flex flex-col flex-1 h-full">
        <span className="inline-block font-mono text-xs font-medium text-brand-400/80 mb-3 tracking-wider">
          {item.date}
        </span>
        <h4 className="text-base lg:text-lg font-semibold text-white mb-3 group-hover:text-brand-200 transition-colors line-clamp-2">
          {item.title}
        </h4>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4 font-light">
          {item.summary}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm text-brand-400/70 group-hover:text-brand-400 group-hover:gap-2.5 transition-all mt-auto pt-4">
          了解更多
          <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
        </span>
      </div>
    </motion.a>
  )
}
