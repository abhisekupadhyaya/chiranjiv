import type { ReactNode } from 'react'

interface HomeSectionShellProps {
  id: string
  children: ReactNode
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  className?: string
}

export function HomeSectionShell({
  id,
  children,
  maxWidth = '4xl',
  className = '',
}: HomeSectionShellProps) {
  const maxWidthClass = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '3xl': 'max-w-3xl',
    '4xl': 'max-w-4xl',
    '5xl': 'max-w-5xl',
    '6xl': 'max-w-6xl',
  }[maxWidth]

  return (
    <section
      id={id}
      className={`relative py-16 sm:py-24 lg:py-32 overflow-hidden ${className}`}
    >
      {/* Simplified background gradient and fewer floating orbs */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-primary/8 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/8 rounded-full blur-3xl animate-float"
        style={{ animationDelay: '3s' }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`${maxWidthClass} mx-auto`}>{children}</div>
      </div>
    </section>
  )
}

