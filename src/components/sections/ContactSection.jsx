import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import SectionContainer from '@/components/ui/SectionContainer'
import SectionTitle from '@/components/ui/SectionTitle'
import ScrollReveal from '@/components/ui/ScrollReveal'
import PrimaryButton from '@/components/ui/PrimaryButton'
import contactData from '@/data/contact.json'
import siteData from '@/data/site.json'

export default function ContactSection() {
  const reduceMotion = useReducedMotion()

  return (
    <SectionContainer id="contact">
      <SectionTitle
        title={contactData.sectionTitle}
        titleEn={contactData.sectionTitleEn}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left - Contact Info */}
        <ScrollReveal direction="left">
          <p className="text-lg text-slate-300 leading-relaxed mb-10">
            {contactData.description}
          </p>

          <div className="space-y-5 mb-10">
            <ContactItem
              icon={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              label="电子邮箱"
              value={contactData.email}
            />
            {contactData.phone && (
              <ContactItem
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                }
                label="联系电话"
                value={contactData.phone}
              />
            )}
            {contactData.address && (
              <ContactItem
                icon={
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                }
                label="公司地址"
                value={contactData.address}
              />
            )}
          </div>

          <PrimaryButton variant="primary" href={`mailto:${contactData.email}`}>
            发送邮件咨询
          </PrimaryButton>
        </ScrollReveal>

        {/* Right - Quick Links */}
        <ScrollReveal direction="right">
          <div className="bg-[rgba(10,22,40,0.6)] border border-[rgba(59,130,246,0.08)] rounded-2xl p-10">
            <h3 className="text-lg font-semibold text-white mb-8">快速导航</h3>
            <div className="space-y-4">
              {contactData.quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    const id = link.href.replace('#', '')
                    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-white/[0.04] transition-colors group"
                >
                  <span className="text-slate-400 group-hover:text-white transition-colors">{link.label}</span>
                  <svg className="w-4 h-4 text-slate-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </SectionContainer>
  )
}

function ContactItem({ icon, label, value }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-white/[0.03] transition-colors">
      <div className="w-10 h-10 rounded-lg bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-slate-500 mb-0.5">{label}</p>
        <p className="text-slate-300 text-sm">{value}</p>
      </div>
    </div>
  )
}
