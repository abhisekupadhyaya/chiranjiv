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
    <footer className="bg-muted/20 border-t border-border/60 py-8 sm:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Tier 1: Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
          {/* Brand block */}
          <div>
            <div className="mb-3">
              <span className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                Chiranjiv
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed font-light">
              Derived from Sanskrit, meaning "long-lasting." We're committed to providing enduring genetic insights for lifelong wellness.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <button
                  type="button"
                  onClick={() => handleHashNavigation('#how-it-works')}
                  className="p-0 text-left bg-transparent border-none cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleHashNavigation('#why-chiranjiv')}
                  className="p-0 text-left bg-transparent border-none cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                >
                  Why Chiranjiv
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleHashNavigation('#waitlist')}
                  className="p-0 text-left bg-transparent border-none cursor-pointer text-muted-foreground hover:text-foreground transition-colors"
                >
                  Join Waitlist
                </button>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">
              Legal
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/data-usage-policy"
                  className="hover:text-foreground transition-colors"
                >
                  Data Usage Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Tier 2: Bottom bar */}
        <div className="border-t border-border/40 pt-4 sm:pt-6">
          <p className="text-xs sm:text-sm text-muted-foreground text-center font-light">
            © 2025 Chiranjiv. All rights reserved. Launching soon!
          </p>
        </div>
      </div>
    </footer>
  )
}
