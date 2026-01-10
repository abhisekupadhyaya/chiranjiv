import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [aboutUsOpen, setAboutUsOpen] = useState(false)
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
    setAboutUsOpen(false)
  }, [location.pathname])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Pill-shaped container for all screen sizes */}
      <div 
        className={`
          mx-4 sm:mx-6 md:mx-auto
          max-w-md sm:max-w-2xl md:max-w-6xl
          mt-2 sm:mt-3 md:mt-4
          rounded-full
          transition-all duration-300 ease-out
          ${scrolled 
            ? 'liquid-glass-nav glass-border-refractive shadow-lg' 
            : 'bg-transparent'
          }
        `}
      >
        <div className="px-3 sm:px-4 md:px-6">
          <div className={`flex items-center justify-between transition-all duration-300 ${scrolled ? 'h-12 sm:h-14 md:h-14' : 'h-14 sm:h-16 md:h-14'}`}>
            <Link to="/" className="flex items-center gap-1.5 sm:gap-2 transition-opacity duration-200 hover:opacity-80">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 flex items-center justify-center">
                <img src="/favicon.ico" alt="Chiranjiv Logo" width={48} height={48} className="w-full h-full object-contain" />
              </div>
              <span className="text-base sm:text-lg md:text-xl font-bold text-foreground tracking-tight letter-spacing-tight">Chiranjiv</span>
            </Link>
            {/* Desktop navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium tracking-tight text-muted-foreground hover:text-foreground transition-all duration-200 nav-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md px-2 py-1">
                  About Us
                  <ChevronDown className="w-4 h-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 glass-backdrop rounded-xl border-border/50 shadow-xl p-2 gap-1">
                  <DropdownMenuItem asChild>
                    <Link to="/team" className="cursor-pointer dropdown-item-hover rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150">Team</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/mission" className="cursor-pointer dropdown-item-hover rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150">Mission</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/blog" className="cursor-pointer dropdown-item-hover rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150">Blog</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/learning-hub" className="cursor-pointer dropdown-item-hover rounded-lg px-3 py-2 text-sm font-medium transition-all duration-150">Learning Hub</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <button onClick={() => handleHashNavigation('#how-it-works')} className="text-sm font-medium tracking-tight text-muted-foreground hover:text-foreground transition-all duration-200 nav-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md px-2 py-1">How It Works</button>
              <button onClick={() => handleHashNavigation('#why-chiranjiv')} className="text-sm font-medium tracking-tight text-muted-foreground hover:text-foreground transition-all duration-200 nav-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md px-2 py-1">Why Us</button>
              <button onClick={() => handleHashNavigation('#waitlist')} className="text-sm font-medium tracking-tight text-muted-foreground hover:text-foreground transition-all duration-200 nav-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md px-2 py-1">Sign In</button>
              <Link to="/faq" className="text-sm font-medium tracking-tight text-muted-foreground hover:text-foreground transition-all duration-200 nav-link-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded-md px-2 py-1">FAQ</Link>
            </div>
            {/* Right actions: CTA and Mobile Menu */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <Button 
                size="sm" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 btn-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background text-xs sm:text-sm px-3 sm:px-4 whitespace-nowrap" 
                onClick={() => handleHashNavigation('#waitlist')}
              >
                <span className="hidden sm:inline">Join Waitlist</span>
                <span className="inline sm:hidden">Join</span>
              </Button>
              <Dialog.Root open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if (!isOpen) setAboutUsOpen(false); }}>
                <Dialog.Trigger
                  aria-label="Open menu"
                  className="md:hidden inline-flex items-center justify-center p-2 rounded-lg border border-border/50 text-foreground hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-200 nav-link-hover"
                >
                  <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                  <Dialog.Content className="fixed inset-y-0 left-0 z-[101] w-80 max-w-[85vw] glass-backdrop border-r border-border/50 shadow-2xl p-6 flex flex-col gap-4 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:slide-in-from-left data-[state=closed]:slide-out-to-left">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 flex items-center justify-center">
                          <img src="/favicon.ico" alt="Chiranjiv Logo" width={32} height={32} className="w-full h-full object-contain" />
                        </div>
                        <span className="text-base font-semibold tracking-tight">Chiranjiv</span>
                      </div>
                      <Dialog.Close
                        aria-label="Close menu"
                        className="inline-flex items-center justify-center p-2 rounded-lg border border-border/50 text-foreground hover:bg-muted/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-all duration-200 nav-link-hover"
                      >
                        <X className="w-5 h-5" />
                      </Dialog.Close>
                    </div>
                    <div className="h-px bg-border/50 my-2" />
                    <div className="flex flex-col gap-1">
                    {/* Collapsible About Us */}
                    <div>
                      <button 
                        onClick={() => setAboutUsOpen(!aboutUsOpen)}
                        className="w-full px-3 py-2.5 text-sm font-medium tracking-tight rounded-lg hover:bg-muted/50 nav-link-hover text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background flex items-center justify-between"
                      >
                        <span>About Us</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${aboutUsOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {aboutUsOpen && (
                        <div className="ml-3 mt-1 flex flex-col gap-1 border-l-2 border-border/30 pl-3">
                          <Link to="/team" className="px-3 py-2 text-sm font-medium tracking-tight rounded-lg hover:bg-muted/50 nav-link-hover transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background" aria-current={location.pathname === '/team' ? 'page' : undefined} onClick={() => setOpen(false)}>
                            Team
                          </Link>
                          <Link to="/mission" className="px-3 py-2 text-sm font-medium tracking-tight rounded-lg hover:bg-muted/50 nav-link-hover transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background" aria-current={location.pathname === '/mission' ? 'page' : undefined} onClick={() => setOpen(false)}>
                            Mission
                          </Link>
                          <Link to="/blog" className="px-3 py-2 text-sm font-medium tracking-tight rounded-lg hover:bg-muted/50 nav-link-hover transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background" aria-current={location.pathname.startsWith('/blog') ? 'page' : undefined} onClick={() => setOpen(false)}>
                            Blog
                          </Link>
                          <Link to="/learning-hub" className="px-3 py-2 text-sm font-medium tracking-tight rounded-lg hover:bg-muted/50 nav-link-hover transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background" aria-current={location.pathname.startsWith('/learning-hub') ? 'page' : undefined} onClick={() => setOpen(false)}>
                            Learning Hub
                          </Link>
                        </div>
                      )}
                    </div>
                    <button onClick={() => { handleHashNavigation('#how-it-works'); setOpen(false); }} className="px-3 py-2.5 text-sm font-medium tracking-tight rounded-lg hover:bg-muted/50 nav-link-hover text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background">How It Works</button>
                    <button onClick={() => { handleHashNavigation('#why-chiranjiv'); setOpen(false); }} className="px-3 py-2.5 text-sm font-medium tracking-tight rounded-lg hover:bg-muted/50 nav-link-hover text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background">Why Us</button>
                    <button onClick={() => { handleHashNavigation('#waitlist'); setOpen(false); }} className="px-3 py-2.5 text-sm font-medium tracking-tight rounded-lg hover:bg-muted/50 nav-link-hover text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background">Sign In</button>
                    <Link to="/faq" className="px-3 py-2.5 text-sm font-medium tracking-tight rounded-lg hover:bg-muted/50 nav-link-hover transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background" aria-current={location.pathname === '/faq' ? 'page' : undefined}>
                      FAQ
                    </Link>
                    </div>
                    <div className="mt-auto pt-4">
                      <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 btn-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background" onClick={() => { handleHashNavigation('#waitlist'); setOpen(false); }}>
                        Join Waitlist
                      </Button>
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}


