import { motion } from 'framer-motion'

export default function ScrollIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
      onClick={() => {
        document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
      }}
    >
      <span className="text-xs text-slate-500 tracking-widest uppercase">Scroll</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="w-5 h-8 rounded-full border border-slate-600 flex items-start justify-center p-1"
      >
        <motion.div className="w-1 h-2 rounded-full bg-brand-400" />
      </motion.div>
    </motion.div>
  )
}
