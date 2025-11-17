import { Link, useLocation, useNavigate } from 'react-router-dom'

export function Footer() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleHashNavigation = (hash: string) => {
    const hashId = hash.replace('#', '')
    if (location.pathname === '/') {
      // Already on home page, just scroll to the element
      const element = document.getElementById(hashId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    } else {
      // Navigate to home page with hash - Home component will handle scrolling
      navigate(`/${hash}`)
      // Also set window.location.hash as fallback for immediate scroll
      setTimeout(() => {
        if (window.location.pathname === '/') {
          window.location.hash = hash
        }
      }, 50)
    }
  }

  return (
    <footer className="bg-muted/20 border-t border-border/60 py-8 sm:py-12 lg:py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Tier 1: Main footer content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">
          {/* Brand block */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-3 sm:mb-4">
              <span className="text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-foreground">
                Chiranjiv
              </span>
            </div>
            <p className="text-sm sm:text-base text-muted-foreground max-w-md leading-relaxed font-light">
              Derived from Sanskrit, meaning "long-lasting." We're committed to providing enduring genetic insights for lifelong wellness.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3 sm:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <li>
                <button
                  type="button"
                  onClick={() => handleHashNavigation('#how-it-works')}
                  className="p-0 text-left bg-transparent border-none cursor-pointer text-muted-foreground hover:text-foreground transition-colors font-light"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleHashNavigation('#why-chiranjiv')}
                  className="p-0 text-left bg-transparent border-none cursor-pointer text-muted-foreground hover:text-foreground transition-colors font-light"
                >
                  Why Chiranjiv
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleHashNavigation('#waitlist')}
                  className="p-0 text-left bg-transparent border-none cursor-pointer text-muted-foreground hover:text-foreground transition-colors font-light"
                >
                  Join Waitlist
                </button>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-foreground mb-3 sm:mb-4">
              Legal
            </h3>
            <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-muted-foreground">
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-foreground transition-colors font-light"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="hover:text-foreground transition-colors font-light"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/data-usage-policy"
                  className="hover:text-foreground transition-colors font-light"
                >
                  Data Usage Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Tier 2: Bottom bar */}
        <div className="border-t border-border/40 pt-6 sm:pt-8">
          <p className="text-xs sm:text-sm text-muted-foreground text-center font-light">
            © 2025 Chiranjiv. All rights reserved. Launching soon!
          </p>
        </div>
      </div>
    </footer>
  )
}
