import SectionTitle from '@/components/ui/SectionTitle'
import NewsCard from './NewsCard'
import newsData from '@/data/news.json'

export default function NewsSection() {
  // If no news items, don't render the section
  if (!newsData.items || newsData.items.length === 0) {
    return null
  }

  return (
    <section id="news" className="relative section-padding bg-[#060B14]">
      <div className="page-container">
        <SectionTitle
          title={newsData.sectionTitle}
          titleEn={newsData.sectionTitleEn}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {newsData.items.map((item, i) => (
            <NewsCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
