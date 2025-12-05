import { Link } from 'react-router-dom'

export function Footer() {
  const handlePlaceholderClick = (e: React.MouseEvent) => {
    e.preventDefault()
    // Placeholder action or console log if needed
  }

  return (
    <footer className="bg-background border-t border-neutral-1000 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12 mb-12">
          {/* Brand block */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4">
              <span className="text-xl font-bold tracking-tight text-foreground">
                Chiranjiv
              </span>
            </div>
            <p className="text-sm text-neutral-600 max-w-md leading-relaxed">
              Derived from Sanskrit, meaning "long-lasting." We're committed to providing enduring genetic insights for lifelong wellness.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li>
                <button
                  type="button"
                  onClick={handlePlaceholderClick}
                  className="hover:text-primary-600 transition-colors text-left cursor-not-allowed opacity-70"
                  title="Coming soon"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handlePlaceholderClick}
                  className="hover:text-primary-600 transition-colors text-left cursor-not-allowed opacity-70"
                  title="Coming soon"
                >
                  Why Chiranjiv
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handlePlaceholderClick}
                  className="hover:text-primary-600 transition-colors text-left cursor-not-allowed opacity-70"
                  title="Coming soon"
                >
                  Join Waitlist
                </button>
              </li>
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Legal
            </h3>
            <ul className="space-y-3 text-sm text-neutral-600">
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-primary-600 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="hover:text-primary-600 transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  to="/data-usage-policy"
                  className="hover:text-primary-600 transition-colors"
                >
                  Data Usage Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-neutral-1000 pt-8">
          <p className="text-sm text-neutral-600 text-center">
            © 2025 Chiranjiv. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
