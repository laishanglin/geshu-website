import { cn } from '@/utils/cn'

export default function SectionTitle({ title, titleEn, align = 'center', className }) {
  return (
    <div className={cn(
      'mb-16 lg:mb-20',
      align === 'center' && 'text-center',
      align === 'left' && 'text-left',
      className
    )}>
      <span className="inline-block text-xs font-medium tracking-[0.25em] uppercase text-brand-400 mb-4">
        {titleEn}
      </span>
      <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
        {title}
      </h2>
      <div className={cn(
        'mt-5 h-0.5 w-16 rounded-full bg-brand-gradient',
        align === 'center' && 'mx-auto'
      )} />
    </div>
  )
}
