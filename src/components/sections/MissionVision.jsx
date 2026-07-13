import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Galaxy from '@/components/ui/Galaxy'
import missionData from '@/data/mission.json'

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {missionData.items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={reduceMotion ? {} : { opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ delay: i * 0.15, duration: 0.7 }}
              className="text-center p-10 rounded-2xl bg-black/60 backdrop-blur-sm border border-white/[0.06] hover:border-white/[0.1] transition-all duration-500 group"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/[0.04] border border-white/[0.06] flex items-center justify-center group-hover:bg-white/[0.08] transition-all duration-500">
                  <img src={item.icon} alt={item.title} className="w-8 h-8" />
                </div>
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">{item.title}</h3>
              <p className="text-xs tracking-[0.25em] uppercase text-brand-400/60 mb-6 font-medium">{item.titleEn}</p>
              <div className="w-10 h-0.5 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 mx-auto mb-6" />
              <p className="text-slate-400 leading-relaxed text-sm lg:text-base font-light">
                {item.content}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
