import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import * as Dialog from '@radix-ui/react-dialog'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

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
                Mission
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48">
                <DropdownMenuItem asChild>
                  <Link to="/mission" className="cursor-pointer">Master Plan</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/blog" className="cursor-pointer">Blog</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#why-chiranjiv" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Why Us</a>
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Privacy
                <ChevronDown className="w-4 h-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/privacy/privacy-policy" className="cursor-pointer">Privacy Policy</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/privacy/terms-of-service" className="cursor-pointer">Terms of Service</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/privacy/data-usage-policy" className="cursor-pointer">Data Usage Policy</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          {/* Right actions: CTA and Mobile Menu */}
          <div className="flex items-center gap-2">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="#waitlist">Join Waitlist</a>
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
                    <a href="#how-it-works" className="px-2 py-2 rounded-md hover:bg-muted/50">How It Works</a>
                    <a href="#why-chiranjiv" className="px-2 py-2 rounded-md hover:bg-muted/50">Why Us</a>
                    <div className="h-px bg-border my-2" />
                    <Link to="/privacy/privacy-policy" className="px-2 py-2 rounded-md hover:bg-muted/50" aria-current={location.pathname === '/privacy/privacy-policy' ? 'page' : undefined}>
                      Privacy Policy
                    </Link>
                    <Link to="/privacy/terms-of-service" className="px-2 py-2 rounded-md hover:bg-muted/50" aria-current={location.pathname === '/privacy/terms-of-service' ? 'page' : undefined}>
                      Terms of Service
                    </Link>
                    <Link to="/privacy/data-usage-policy" className="px-2 py-2 rounded-md hover:bg-muted/50" aria-current={location.pathname === '/privacy/data-usage-policy' ? 'page' : undefined}>
                      Data Usage Policy
                    </Link>
                  </div>
                  <div className="mt-auto pt-4">
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                      <a href="#waitlist" onClick={() => setOpen(false)}>Join Waitlist</a>
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


