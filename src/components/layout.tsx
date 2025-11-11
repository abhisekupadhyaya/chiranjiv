import { Outlet } from 'react-router-dom'
import { Navigation } from '@/components/navigation'
import { Footer } from '@/components/footer'

export function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Outlet />
      <Footer />
    </div>
  )
}


