import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'
import { ScrollToTop } from '@/components/scroll-to-top'

export function Layout() {
  const location = useLocation()

  // Automatically scroll to top on route change
  // Skips auto-scroll for hash-based navigation (e.g., #waitlist, #how-it-works)
  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [location.pathname, location.search])

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Outlet />
      <Footer />
      <ScrollToTop />
    </div>
  )
}


