import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { Mail, Phone, MapPin, ChevronRight } from 'lucide-react'
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
                <Mail className="w-5 h-5 text-brand-400" strokeWidth={1.5} />
              }
              label="电子邮箱"
              value={contactData.email}
            />
            {contactData.phone && (
              <ContactItem
                icon={
                  <Phone className="w-5 h-5 text-brand-400" strokeWidth={1.5} />
                }
                label="联系电话"
                value={contactData.phone}
              />
            )}
            {contactData.address && (
              <ContactItem
                icon={
                  <MapPin className="w-5 h-5 text-brand-400" strokeWidth={1.5} />
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
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-brand-400 group-hover:translate-x-1 transition-all" strokeWidth={2} />
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
