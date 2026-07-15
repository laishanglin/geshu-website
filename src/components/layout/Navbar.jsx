import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import navData from '@/data/navigation.json'
import siteData from '@/data/site.json'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = navData.map(item => item.href.replace('#', ''))
    const observers = []
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-40% 0px -55% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })
    return () => observers.forEach(o => o.disconnect())
  }, [])

  const handleClick = (e, href) => {
    e.preventDefault()
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(6,11,20,0.88)] backdrop-blur-2xl border-b border-[rgba(59,130,246,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="page-container flex items-center justify-between h-20">
        {/* Logo */}
        <a href="#hero" onClick={(e) => handleClick(e, '#hero')} className="flex items-center gap-3 group">
          <img src="images/logo.png" alt={siteData.companyName} className="h-20 w-auto -translate-y-1 -translate-x-2" />
        </a>

        {/* Nav Links */}
        <div className="hidden lg:flex items-center gap-1">
          {navData.map((item) => {
            const isActive = activeSection === item.href.replace('#', '')
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-lg ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {item.label}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-white/[0.04] rounded-lg border border-white/[0.06]"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </div>

        {/* CTA */}
        <a
          href="#contact"
          onClick={(e) => handleClick(e, '#contact')}
          className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 text-white text-sm font-semibold hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all duration-300 hover:scale-105"
        >
          项目咨询
          <ArrowRight className="w-3.5 h-3.5 text-white" />
        </a>
      </div>
    </motion.nav>
  )
}
