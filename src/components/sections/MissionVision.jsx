import { motion } from 'framer-motion'
import { Crosshair, Compass, Heart } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Galaxy from '@/components/ui/Galaxy'
import missionData from '@/data/mission.json'

const missionIcons = [Crosshair, Compass, Heart]
const missionColors = ['text-emerald-500', 'text-blue-400', 'text-red-400']

export default function MissionVision() {
  const reduceMotion = useReducedMotion()

  return (
    <section id="mission" className="relative py-28 lg:py-36 overflow-hidden">
      {/* Galaxy background covering full section */}
      <div className="absolute inset-0 bg-[#060B14]">
        <Galaxy
          density={0.5}
          glowIntensity={0.4}
          saturation={0}
          hueShift={0}
          mouseRepulsion={true}
          repulsionStrength={1.5}
          twinkleIntensity={0.4}
          rotationSpeed={0.05}
          transparent={true}
        />
      </div>

      {/* Content overlay */}
      <div className="relative z-10 page-container">
        {/* Title */}
        <div className="text-center mb-16 lg:mb-20">
          <span className="inline-block text-xs font-medium tracking-[0.25em] uppercase text-brand-400 mb-4">
            {missionData.sectionTitleEn}
          </span>
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
            {missionData.sectionTitle}
          </h2>
          <div className="mt-5 h-0.5 w-16 rounded-full bg-brand-gradient mx-auto" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto items-stretch">
          {missionData.items.map((item, i) => {
            const Icon = missionIcons[i]
            const color = missionColors[i]
            return (
            <motion.div
              key={item.title}
              initial={reduceMotion ? {} : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="group relative flex flex-col items-center text-center p-10 rounded-2xl bg-black/40 backdrop-blur-sm border border-white/[0.05] hover:bg-black/60 hover:border-brand-500/15 transition-all duration-500"
            >
              {/* Icon */}
              <div className="relative mb-6">
                <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-brand-500/0 group-hover:bg-brand-500/5 blur-xl transition-all duration-700 scale-75 group-hover:scale-100" />
                <div className="relative w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.05] flex items-center justify-center group-hover:bg-white/[0.06] group-hover:border-brand-400/20 transition-all duration-500">
                  <Icon className={`w-8 h-8 ${color} opacity-70 group-hover:opacity-100 transition-all duration-500`} strokeWidth={1.5} />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-2xl lg:text-3xl font-bold text-white/90 group-hover:text-white mb-2 transition-colors duration-500">
                {item.title}
              </h3>

              {/* Subtitle */}
              <p className="text-xs tracking-[0.25em] uppercase text-brand-400/50 group-hover:text-brand-400/80 mb-6 font-medium transition-colors duration-500">
                {item.titleEn}
              </p>

              {/* Divider */}
              <div className="w-8 h-px rounded-full bg-gradient-to-r from-brand-500/50 to-accent-500/50 group-hover:from-brand-500 group-hover:to-accent-500 group-hover:w-14 transition-all duration-500 mb-6" />

              {/* Content */}
              <p className="text-slate-500 leading-relaxed text-sm lg:text-base font-light group-hover:text-slate-400 transition-colors duration-500 flex-1">
                {item.content}
              </p>
            </motion.div>
            )})}
        </div>
      </div>
    </section>
  )
}
