import { cn } from '@/utils/cn'

export default function SectionContainer({ children, id, className, bgAlt = false }) {
  return (
    <section
      id={id}
      className={cn(
        'section-padding',
        bgAlt ? 'bg-[#0A1628]' : 'bg-transparent',
        className
      )}
    >
      <div className="page-container">
        {children}
      </div>
    </section>
  )
}
