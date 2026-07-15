import { motion } from 'framer-motion'
import { Building2, Handshake, Plane, Sparkles } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import BorderGlow from '@/components/ui/BorderGlow'

const areaIcons = {
  strategy: Building2,
  platform: Handshake,
  governance: Plane,
  ai: Sparkles,
}

const areaColors = {
  strategy: 'text-blue-400',
  platform: 'text-purple-400',
  governance: 'text-cyan-400',
  ai: 'text-yellow-400',
}

export default function BusinessAreaCard({ area, index }) {
  const reduceMotion = useReducedMotion()
  const Icon = areaIcons[area.id]
  const color = areaColors[area.id]

  return (
    <motion.div
      initial={reduceMotion ? {} : { opacity: 0, y: 50, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] }}
      className="h-full p-1.5"
    >
      <BorderGlow
        backgroundColor="#0A1628"
        borderRadius={16}
        glowRadius={24}
        glowIntensity={1.0}
        edgeSensitivity={35}
        coneSpread={20}
        glowColor="210 70 65"
        colors={['#3B82F6', '#8B5CF6', '#06B6D4']}
        animated
        className="h-full"
      >
        <div className="p-8 lg:p-10 h-full flex flex-col min-h-0">
          {/* Icon */}
          <div className="mb-6 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
              <Icon className={`w-6 h-6 ${color}`} strokeWidth={1.5} />
            </div>
          </div>

          {/* Title */}
          <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">
            {area.title}
          </h3>

          {/* Description */}
          <p className="text-slate-400 text-sm lg:text-base leading-relaxed mb-6 font-light flex-1">
            {area.shortDesc}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 shrink-0">
            {area.highlights.map((tag) => (
              <span
                key={tag}
                className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-brand-500/[0.06] text-brand-300/80 border border-brand-500/[0.08] transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </BorderGlow>
    </motion.div>
  )
}
