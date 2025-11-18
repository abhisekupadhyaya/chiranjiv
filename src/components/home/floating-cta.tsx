import { useEffect, useState } from 'react'

interface FloatingCtaProps {
  show?: boolean
}

export function FloatingCta({ show = true }: FloatingCtaProps) {
  const [isLocked, setIsLocked] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer')
      if (!footer) return

      const footerRect = footer.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Lock the bar when the footer comes close to the viewport bottom
      const threshold = windowHeight - 140 // Bar height + some margin

      if (footerRect.top <= threshold) {
        setIsLocked(true)
      } else {
        setIsLocked(false)
      }
    }

    // Initial check
    handleScroll()

    // Add scroll listener with throttling for performance
    let ticking = false
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll()
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', scrollListener)
    window.addEventListener('resize', handleScroll)

    return () => {
      window.removeEventListener('scroll', scrollListener)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const handleClick = () => {
    const element = document.getElementById('waitlist')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div
      className={`
        ${isLocked ? 'absolute' : 'fixed'}
        ${isLocked ? 'bottom-0' : 'bottom-6 sm:bottom-4 md:bottom-6'}
        left-0 right-0 z-40
        transition-all duration-500 ease-out
        ${show ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'}
      `}
      style={isLocked ? { position: 'absolute' } : undefined}
    >
      {/* Pill-shaped container */}
      <div
        className={`
          mx-3 sm:mx-6 md:mx-auto
          max-w-md sm:max-w-2xl md:max-w-5xl lg:max-w-6xl
          rounded-full
          liquid-glass-nav glass-border-refractive shadow-lg
          transition-all duration-300 ease-out
          cursor-pointer
          md:hover:shadow-2xl md:hover:scale-[1.02]
          active:scale-[0.98]
          group
        `}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label="Join waitlist - Worth ₹1,50,000, Free for early users"
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
      >
        <div className="px-3 sm:px-5 md:px-8 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 md:gap-5 py-2.5 sm:py-3.5 md:py-5">
            {/* Left content box: Lines 1 & 2 */}
            <div className="flex flex-col gap-0.5 sm:gap-1 md:gap-1.5 flex-1 text-left min-w-0">
              {/* Line 1: Heading */}
              <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-light tracking-tight text-foreground leading-tight sm:leading-snug truncate">
                Worth ₹1,50,000. Free for early users.
              </h3>

              {/* Line 2: Subcopy */}
              <p className="text-[10px] sm:text-xs md:text-sm text-muted-foreground font-light leading-tight sm:leading-relaxed line-clamp-1">
                Full genome sequencing + lifetime health insights + data co-ownership
              </p>
            </div>

            {/* Right badge box: Line 3 */}
            <div className="flex items-center justify-start sm:justify-end gap-1 sm:gap-2 md:gap-2.5 flex-shrink-0 sm:border-l border-border/30 sm:pl-3 md:pl-4 lg:pl-6">
              <div className="text-sm sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extralight tracking-tight text-primary transition-all duration-200 md:group-hover:scale-105 whitespace-nowrap">
                FREE
              </div>
              <div className="text-[8px] sm:text-[10px] md:text-xs lg:text-sm text-primary/80 font-light tracking-wide whitespace-nowrap">
                For Early Users
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

