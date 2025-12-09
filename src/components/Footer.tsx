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
      // Navigate to home page with hash
      navigate(`/${hash}`)
      setTimeout(() => {
        if (window.location.pathname === '/') {
          window.location.hash = hash
        }
      }, 50)
    }
  }

  return (
    <footer className="bg-neutral-200 border-t border-white/10 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12 mb-12">
          {/* Brand block */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <span className="text-xl font-bold tracking-tight text-neutral-1000">
                Chiranjiv
              </span>
            </div>
            <p className="text-sm text-neutral-900 max-w-md leading-relaxed">
              Derived from Sanskrit, meaning "long-lasting." We're committed to providing enduring genetic insights for lifelong wellness.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-1000 mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-neutral-900">
              <li>
                <button
                  type="button"
                  onClick={() => handleHashNavigation('#how-it-works')}
                  className="hover:text-primary-300 transition-colors text-left"
                >
                  How It Works
                </button>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="hover:text-primary-300 transition-colors text-left"
                >
                  Join Waitlist
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="hover:text-primary-300 transition-colors text-left"
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold text-neutral-1000 mb-4">
              Legal
            </h3>
            <ul className="space-y-3 text-sm text-neutral-900">
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-primary-300 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="hover:text-primary-300 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/data-usage-policy"
                  className="hover:text-primary-300 transition-colors"
                >
                  Data Usage Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-sm text-neutral-800 text-center">
            © 2025 Chiranjiv. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
