import SectionContainer from '@/components/ui/SectionContainer'
import SectionTitle from '@/components/ui/SectionTitle'
import ScrollReveal from '@/components/ui/ScrollReveal'
import BusinessAreaCard from './BusinessAreaCard'
import businessData from '@/data/businessAreas.json'

export default function BusinessAreas() {
  return (
    <SectionContainer id="business" bgAlt>
      <SectionTitle
        title={businessData.sectionTitle}
        titleEn={businessData.sectionTitleEn}
      />

      <ScrollReveal>
        <p className="text-center text-slate-400 text-lg mb-14 -mt-8 max-w-2xl mx-auto">
          {businessData.subtitle}
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 items-stretch">
        {businessData.areas.map((area, index) => (
          <BusinessAreaCard key={area.id} area={area} index={index} />
        ))}
      </div>
    </SectionContainer>
  )
}
