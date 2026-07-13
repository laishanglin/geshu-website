import { cn } from '@/utils/cn'

export default function PageWrapper({ children, className }) {
  return (
    <div className={cn('page-container', className)}>
      {children}
    </div>
  )
}
