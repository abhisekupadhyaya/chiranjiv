import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Card } from '@/components/ui/card'

interface PolicySection {
  id: string
  label: string
}

interface PolicyLayoutProps {
  title: string
  effectiveDate?: string
  lastUpdated: string
  category?: string
  sections?: PolicySection[]
  children: React.ReactNode
  topContent?: React.ReactNode
}

export function PolicyLayout({ 
  title, 
  effectiveDate, 
  lastUpdated, 
  sections,
  children,
  topContent
}: PolicyLayoutProps) {
  const [activeSection, setActiveSection] = useState<string>('')
  const [tocOpen, setTocOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sections || sections.length === 0) return

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    sections.forEach((section) => {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => observer.disconnect()
  }, [sections])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      })
      setTocOpen(false)
    }
  }

  return (
    <section className="relative pt-24 sm:pt-32 pb-16 sm:pb-24 overflow-hidden min-h-screen">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5" />
      
      {/* Floating animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" 
        style={{ animationDelay: '2s' }}
      />
      <div 
        className="absolute top-1/2 right-1/3 w-72 h-72 bg-accent/10 rounded-full blur-3xl animate-float" 
        style={{ animationDelay: '4s' }}
      />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight text-foreground mb-4 text-balance tracking-tight leading-[1.1]">
            {title}
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground font-light mt-4">
            {effectiveDate && (
              <>
                <span>
                  <span className="font-medium">Effective Date:</span> {effectiveDate}
                </span>
                <span className="hidden sm:inline text-muted-foreground/30">•</span>
              </>
            )}
            <span>
              <span className="font-medium">Last Updated:</span> {lastUpdated}
            </span>
          </div>
          <div className="mt-6">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-foreground transition-colors font-light"
            >
              ← Back to Home
            </Link>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto">
          {topContent && (
            <div className="mb-6 sm:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
              {topContent}
            </div>
          )}
          
          <Card className="glass-backdrop backdrop-blur-sm border border-border/50 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-4 duration-700 [animation-delay:100ms]">
            {sections && sections.length > 0 ? (
              <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
                {/* Mobile TOC Toggle */}
                <div className="lg:hidden p-6 sm:p-8 border-b border-border/30">
                  <button
                    onClick={() => setTocOpen(!tocOpen)}
                    className="w-full flex items-center justify-between text-left text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <span>Table of Contents</span>
                    <svg
                      className={`w-5 h-5 transition-transform duration-200 ${tocOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {tocOpen && (
                    <nav className="mt-4 space-y-2">
                      {sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-light transition-all duration-200 ${
                            activeSection === section.id
                              ? 'bg-primary/10 text-primary border-l-2 border-primary'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          }`}
                        >
                          {section.label}
                        </button>
                      ))}
                    </nav>
                  )}
                </div>

                {/* Desktop TOC - Sticky */}
                <aside className="hidden lg:block p-6 sm:p-8 border-r border-border/30">
                  <div className="sticky top-24">
                    <h2 className="text-sm font-medium text-foreground mb-4 tracking-tight">Table of Contents</h2>
                    <nav className="space-y-2">
                      {sections.map((section) => (
                        <button
                          key={section.id}
                          onClick={() => scrollToSection(section.id)}
                          className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-light transition-all duration-200 ${
                            activeSection === section.id
                              ? 'bg-primary/10 text-primary border-l-2 border-primary'
                              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                          }`}
                        >
                          {section.label}
                        </button>
                      ))}
                    </nav>
                  </div>
                </aside>

                {/* Content Column */}
                <div ref={contentRef} className="p-6 sm:p-8 md:p-10">
                  <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 font-light">
                    {children}
                  </div>
                  <div className="mt-12 pt-8 border-t border-border/30">
                    <p className="text-sm text-muted-foreground font-light">
                      Questions about this document? Contact us at{' '}
                      <a href="mailto:support@chiranjiv.com" className="text-primary hover:underline font-medium">
                        support@chiranjiv.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 sm:p-8 md:p-10">
                <div className="prose prose-slate dark:prose-invert max-w-none space-y-8 font-light">
                  {children}
                </div>
                <div className="mt-12 pt-8 border-t border-border/30">
                  <p className="text-sm text-muted-foreground font-light">
                    Questions about this document? Contact us at{' '}
                    <a href="mailto:support@chiranjiv.com" className="text-primary hover:underline font-medium">
                      support@chiranjiv.com
                    </a>
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </section>
  )
}

