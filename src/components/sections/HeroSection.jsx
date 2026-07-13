import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import LiquidEther from '@/components/ui/LiquidEther'
import BlurText from '@/components/ui/BlurText'
import PrimaryButton from '@/components/ui/PrimaryButton'
import GradientText from '@/components/ui/GradientText'
import ScrollIndicator from '@/components/ui/ScrollIndicator'
import heroData from '@/data/hero.json'

export default function HeroSection() {
  const reduceMotion = useReducedMotion()

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  }

  const wordVariants = {
    hidden: { filter: 'blur(12px)', opacity: 0, y: 40 },
    visible: {
      filter: 'blur(0px)',
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  }

  return (
    <section id="hero" className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background: LiquidEther fluid simulation */}
      <div className="absolute inset-0 bg-[#060B14]">
        <LiquidEther
          colors={['#1D4ED8', '#3B82F6', '#06B6D4']}
          mouseForce={39}
          cursorSize={175}
          resolution={0.5}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={42}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.55}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#060B14]/60 via-transparent to-[#060B14]/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center page-container">
        {reduceMotion ? (
          <h1 className="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6">
            {heroData.slogan}
            <br />
            <GradientText as="span">{heroData.sloganHighlight}</GradientText>
          </h1>
        ) : (
          <motion.h1
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl lg:text-6xl xl:text-7xl font-black leading-tight mb-6"
          >
            <motion.span variants={wordVariants}>{heroData.slogan}</motion.span>
            <br />
            <motion.span variants={wordVariants} className="bg-brand-gradient bg-clip-text text-transparent">
              {heroData.sloganHighlight}
            </motion.span>
          </motion.h1>
        )}

        <BlurText delay={0.5}>
          <p className="text-lg lg:text-xl text-slate-400/80 max-w-2xl mx-auto mb-12 font-light tracking-wide">
            {heroData.subtitle}
          </p>
        </BlurText>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }}
          className="flex items-center justify-center gap-4"
        >
          <PrimaryButton href="#business" variant="primary">
            {heroData.ctaPrimary}
          </PrimaryButton>
          <PrimaryButton href="#contact" variant="outline">
            {heroData.ctaSecondary}
          </PrimaryButton>
        </motion.div>
      </div>

      <ScrollIndicator />
    </section>
  )
}
