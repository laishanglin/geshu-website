import { cn } from '@/utils/cn'

export default function GradientText({ children, className, as: Tag = 'span' }) {
  return (
    <Tag
      className={cn(
        'bg-brand-gradient bg-clip-text text-transparent',
        className
      )}
    >
      {children}
    </Tag>
  )
}
