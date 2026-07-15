import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import SectionContainer from '@/components/ui/SectionContainer'
import SectionTitle from '@/components/ui/SectionTitle'
import ScrollReveal from '@/components/ui/ScrollReveal'
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack'
import companyData from '@/data/company.json'

export default function CompanyOverview() {
  const reduceMotion = useReducedMotion()

  return (
    <SectionContainer id="about">
      <SectionTitle title={companyData.sectionTitle} titleEn={companyData.sectionTitleEn} align="left" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
        {/* Left - Text Content */}
        <ScrollReveal direction="left">
          <p className="text-lg lg:text-xl text-slate-300/80 leading-relaxed mb-10 font-light">
            {companyData.intro}
          </p>

          <div className="space-y-4">
            {companyData.highlights.map((item, i) => (
              <motion.div
                key={item.title}
                initial={reduceMotion ? {} : { opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="flex items-start gap-4 p-5 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:bg-white/[0.04] hover:border-brand-500/10 transition-all duration-300"
              >
                <img src={item.icon} alt="" className="w-9 h-9 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base font-semibold text-white mb-1">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollReveal>

        {/* Right - ScrollStack Cards */}
        <ScrollReveal direction="right">
          <div style={{ height: 380 }} className="lg:mt-14">
            <ScrollStack
              itemDistance={80}
              itemScale={0.04}
              itemStackDistance={25}
              stackPosition="15%"
              scaleEndPosition="5%"
              baseScale={0.88}
            >
              <ScrollStackItem>
                <div className="flex flex-col gap-4 p-2">
                  <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
                    <svg className="w-7 h-7 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 7v10c0 2 1 3 3 3h10c2 0 3-1 3-3V7"/>
                      <path d="M16 3H8l-4 4h16l-4-4z"/>
                      <rect x="8" y="10" width="2" height="6" rx="0.5"/>
                      <rect x="11" y="13" width="2" height="3" rx="0.5"/>
                      <rect x="14" y="8" width="2" height="8" rx="0.5"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">数据底座</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">打通企业内部数据孤岛，搭建集团统一数据中台与治理标准，实现数据可管、可用、可运营，支撑国资数字化转型战略。</p>
                  </div>
                </div>
              </ScrollStackItem>
              <ScrollStackItem>
                <div className="flex flex-col gap-4 p-2">
                  <div className="w-14 h-14 rounded-2xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center">
                    <svg className="w-7 h-7 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">AI场景落地</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">以法务风控、文旅智能客服、金融授信为核心场景，落地多Agent智能协作，将大模型能力转化为业务降本增效工具。</p>
                  </div>
                </div>
              </ScrollStackItem>
              <ScrollStackItem>
                <div className="flex flex-col gap-4 p-2">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <svg className="w-7 h-7 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                      <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">产业生态共建</h4>
                    <p className="text-sm text-slate-400 leading-relaxed">联动政府委办、银行保险、头部互联网、高校实验室，打造金融、知识产权、文旅数据融合创新平台。</p>
                  </div>
                </div>
              </ScrollStackItem>
            </ScrollStack>
          </div>
          <p className="text-brand-300/80 text-sm font-medium tracking-wide text-center mt-4">
            {companyData.visualDesc}
          </p>
        </ScrollReveal>
      </div>
    </SectionContainer>
  )
}
