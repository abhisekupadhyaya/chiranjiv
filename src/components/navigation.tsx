import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close the drawer on route change and restore focus to trigger
  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-lg border-b border-border' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <img src="/favicon.ico" alt="Chiranjiv Logo" width={48} height={48} className="w-full h-full object-contain" />
            </div>
            <span className="text-lg sm:text-xl font-bold text-foreground">Chiranjiv</span>
          </Link>
          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                About Us
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/mission" className="cursor-pointer">Master Plan</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/blog" className="cursor-pointer">Blog</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/team" className="cursor-pointer">Team</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link to="/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">FAQ</Link>
            <button onClick={() => handleHashNavigation('#how-it-works')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</button>
            <button onClick={() => handleHashNavigation('#why-chiranjiv')} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Why Us</button>
          </div>
          {/* Right actions: CTA and Mobile Menu */}
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => handleHashNavigation('#waitlist')}>
              Join Waitlist
            </Button>
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger
                aria-label="Open menu"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md border border-border text-foreground hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                <Menu className="w-5 h-5" />
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-black/40 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                <Dialog.Content className="fixed inset-y-0 left-0 w-80 max-w-[85vw] bg-background border-r border-border shadow-xl p-6 flex flex-col gap-4 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold">Menu</span>
                    <Dialog.Close
                      aria-label="Close menu"
                      className="inline-flex items-center justify-center p-2 rounded-md border border-border text-foreground hover:bg-muted/50 focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <X className="w-5 h-5" />
                    </Dialog.Close>
                  </div>
                  <div className="h-px bg-border my-2" />
                  <div className="flex flex-col gap-2">
                    <Link to="/mission" className="px-2 py-2 rounded-md hover:bg-muted/50" aria-current={location.pathname === '/mission' ? 'page' : undefined}>
                      Master Plan
                    </Link>
                    <Link to="/blog" className="px-2 py-2 rounded-md hover:bg-muted/50" aria-current={location.pathname.startsWith('/blog') ? 'page' : undefined}>
                      Blog
                    </Link>
                    <Link to="/team" className="px-2 py-2 rounded-md hover:bg-muted/50" aria-current={location.pathname === '/team' ? 'page' : undefined}>
                      Team
                    </Link>
                    <Link to="/faq" className="px-2 py-2 rounded-md hover:bg-muted/50" aria-current={location.pathname === '/faq' ? 'page' : undefined}>
                      FAQ
                    </Link>
                    <button onClick={() => { handleHashNavigation('#how-it-works'); setOpen(false); }} className="px-2 py-2 rounded-md hover:bg-muted/50 text-left">How It Works</button>
                    <button onClick={() => { handleHashNavigation('#why-chiranjiv'); setOpen(false); }} className="px-2 py-2 rounded-md hover:bg-muted/50 text-left">Why Us</button>
                  </div>
                  <div className="mt-auto pt-4">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" onClick={() => { handleHashNavigation('#waitlist'); setOpen(false); }}>
                      Join Waitlist
                    </Button>
                  </div>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
        </div>
      </div>
    </nav>
  )
}


