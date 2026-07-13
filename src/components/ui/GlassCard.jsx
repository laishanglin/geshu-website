import { cn } from '@/utils/cn'

export default function GlassCard({ children, className, hover = true }) {
  return (
    <div
      className={cn(
        'rounded-2xl p-8 lg:p-10 gradient-border transition-all duration-500',
        hover && 'hover:bg-[rgba(20,40,80,0.5)] hover:shadow-card-hover hover:-translate-y-1',
        className
      )}
    >
      {children}
    </div>
  )
}
