import { ReactNode } from 'react'

type CalloutVariant = 'info' | 'warning' | 'rights' | 'definition' | 'key-points'

interface PolicyCalloutProps {
  variant?: CalloutVariant
  title?: string
  children: ReactNode
  className?: string
}

const variantStyles: Record<CalloutVariant, { container: string; border: string; title: string }> = {
  info: {
    container: 'bg-primary/5 border-primary/20',
    border: 'border-l-4 border-primary',
    title: 'text-primary'
  },
  warning: {
    container: 'bg-amber-500/10 border-amber-500/30',
    border: 'border-l-4 border-amber-500',
    title: 'text-amber-600 dark:text-amber-400'
  },
  rights: {
    container: 'bg-emerald-500/10 border-emerald-500/30',
    border: 'border-l-4 border-emerald-500',
    title: 'text-emerald-600 dark:text-emerald-400'
  },
  definition: {
    container: 'bg-secondary/5 border-secondary/20',
    border: 'border-l-4 border-secondary',
    title: 'text-secondary'
  },
  'key-points': {
    container: 'bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 border-primary/30',
    border: 'border-l-4 border-primary',
    title: 'text-primary'
  }
}

export function PolicyCallout({ 
  variant = 'info', 
  title, 
  children, 
  className = '' 
}: PolicyCalloutProps) {
  const styles = variantStyles[variant]
  
  return (
    <div 
      className={`rounded-lg p-5 border ${styles.container} ${styles.border} ${className} transition-all duration-300 hover:shadow-md`}
    >
      {title && (
        <h4 className={`text-sm font-semibold mb-3 tracking-tight ${styles.title}`}>
          {title}
        </h4>
      )}
      <div className="text-sm leading-relaxed">
        {children}
      </div>
    </div>
  )
}

