import { useState, useEffect, memo } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, ChevronDown, User } from "lucide-react"
import { cn } from "@/lib/utils"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "@/auth"

export const Navbar = memo(function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [aboutUsOpen, setAboutUsOpen] = useState(false)
  const [mediaInsightsOpen, setMediaInsightsOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const { isAuthenticated, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
    setMobileMenuOpen(false)
  }

  const handleSignOut = async () => {
    await logout();
    navigate('/');
    setMobileMenuOpen(false)
  }

  const handleMobileNavClick = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={cn(
        "fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-custom-bezier",
        isScrolled
          ? "top-6 w-[95%] max-w-[76rem] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl py-2"
          : "top-0 w-full rounded-none border-b-0 border-transparent bg-transparent backdrop-blur-none shadow-none py-4"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img 
            src="/favicon.ico" 
            alt="Brand logo" 
            className="h-8 w-8 rounded-xl object-contain"
          />
          <span className="text-base sm:text-lg md:text-xl font-bold text-foreground tracking-tight letter-spacing-tight">
            Chiranjiv
          </span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium text-foreground">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hover:text-primary-600 flex items-center gap-1">
                About Us
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="min-w-[160px] rounded-xl border border-neutral-1000/60 bg-background/80 backdrop-blur-md shadow-sm p-1.5"
            >
              <DropdownMenuItem asChild className="rounded-lg hover:bg-neutral-100/80 focus:bg-neutral-100/80 text-foreground hover:text-primary-600 cursor-pointer">
                <Link to="/team" className="w-full px-3 py-2">Team</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-lg hover:bg-neutral-100/80 focus:bg-neutral-100/80 text-foreground hover:text-primary-600 cursor-pointer">
                <Link to="/mission" className="w-full px-3 py-2">Mission</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" className="hover:text-primary-600" onClick={() => handleHashNavigation('#how-it-works')}>How It Works</Button>
          {isAuthenticated ? (
             <DropdownMenu>
             <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="hover:text-primary-600 flex items-center gap-1">
                 <User className="w-4 h-4" />
                 Profile
                 <ChevronDown className="w-4 h-4" />
               </Button>
             </DropdownMenuTrigger>
             <DropdownMenuContent 
               align="end" 
               className="min-w-[160px] rounded-xl border border-neutral-1000/60 bg-background/80 backdrop-blur-md shadow-sm p-1.5"
             >
               <DropdownMenuItem asChild className="rounded-lg hover:bg-neutral-100/80 focus:bg-neutral-100/80 text-foreground hover:text-primary-600 cursor-pointer">
                 <Link to="/profile" className="w-full px-3 py-2">My Profile</Link>
               </DropdownMenuItem>
               <DropdownMenuItem className="rounded-lg hover:bg-neutral-100/80 focus:bg-neutral-100/80 text-foreground hover:text-primary-600 cursor-pointer" onClick={handleSignOut}>
                 <span className="w-full px-3 py-2">Sign Out</span>
               </DropdownMenuItem>
             </DropdownMenuContent>
           </DropdownMenu>
          ) : (
            <Link to="/signin">
              <Button variant="ghost" className="hover:text-primary-600">Sign In</Button>
            </Link>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="hover:text-primary-600 flex items-center gap-1">
                Learn
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="start" 
              className="min-w-[160px] rounded-xl border border-neutral-1000/60 bg-background/80 backdrop-blur-md shadow-sm p-1.5"
            >
              <DropdownMenuItem asChild className="rounded-lg hover:bg-neutral-100/80 focus:bg-neutral-100/80 text-foreground hover:text-primary-600 cursor-pointer">
                <Link to="/learn/insights" className="w-full px-3 py-2">Insights</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-lg hover:bg-neutral-100/80 focus:bg-neutral-100/80 text-foreground hover:text-primary-600 cursor-pointer">
                <Link to="/learn/media-mentions" className="w-full px-3 py-2">Media Mentions</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link to="/careers">
            <Button variant="ghost" className="hover:text-primary-600">Careers</Button>
          </Link>
          <Link to="/faq">
            <Button variant="ghost" className="hover:text-primary-600">FAQ</Button>
          </Link>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {!isAuthenticated && (
             <Link to="/signup">
               <Button>Request Access</Button>
             </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-foreground" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="max-w-xs sm:max-w-sm">
            <nav className="flex flex-col gap-4 mt-8">
              <div>
                <Button 
                  variant="ghost" 
                  className="justify-start h-12 text-lg hover:text-primary-600 w-full flex items-center justify-between"
                  onClick={() => setAboutUsOpen(!aboutUsOpen)}
                >
                  About Us
                  <ChevronDown className={cn("w-4 h-4 transition-transform", aboutUsOpen && "rotate-180")} />
                </Button>
                {aboutUsOpen && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    <Link to="/team" onClick={handleMobileNavClick}>
                      <Button variant="ghost" className="justify-start h-10 text-base hover:text-primary-600 w-full">Team</Button>
                    </Link>
                    <Link to="/mission" onClick={handleMobileNavClick}>
                      <Button variant="ghost" className="justify-start h-10 text-base hover:text-primary-600 w-full">Mission</Button>
                    </Link>
                  </div>
                )}
              </div>
              <Button variant="ghost" className="justify-start h-12 text-lg hover:text-primary-600" onClick={() => handleHashNavigation('#how-it-works')}>How It Works</Button>
              {isAuthenticated ? (
                <>
                   <Link to="/profile" onClick={handleMobileNavClick}>
                    <Button variant="ghost" className="justify-start h-12 text-lg hover:text-primary-600 w-full">Profile</Button>
                  </Link>
                  <Button variant="ghost" className="justify-start h-12 text-lg hover:text-primary-600 w-full" onClick={handleSignOut}>Sign Out</Button>
                </>
              ) : (
                <Link to="/signin" onClick={handleMobileNavClick}>
                  <Button variant="ghost" className="justify-start h-12 text-lg hover:text-primary-600 w-full">Sign In</Button>
                </Link>
              )}
             
              <div>
                <Button 
                  variant="ghost" 
                  className="justify-start h-12 text-lg hover:text-primary-600 w-full flex items-center justify-between"
                  onClick={() => setMediaInsightsOpen(!mediaInsightsOpen)}
                >
                  Learn
                  <ChevronDown className={cn("w-4 h-4 transition-transform", mediaInsightsOpen && "rotate-180")} />
                </Button>
                {mediaInsightsOpen && (
                  <div className="ml-4 mt-2 flex flex-col gap-2">
                    <Link to="/learn/insights" onClick={handleMobileNavClick}>
                      <Button variant="ghost" className="justify-start h-10 text-base hover:text-primary-600 w-full">Insights</Button>
                    </Link>
                    <Link to="/learn/media-mentions" onClick={handleMobileNavClick}>
                      <Button variant="ghost" className="justify-start h-10 text-base hover:text-primary-600 w-full">Media Mentions</Button>
                    </Link>
                  </div>
                )}
              </div>
              <Link to="/careers" onClick={handleMobileNavClick}>
                <Button variant="ghost" className="justify-start h-12 text-lg hover:text-primary-600 w-full">Careers</Button>
              </Link>
              <Link to="/faq" onClick={handleMobileNavClick}>
                <Button variant="ghost" className="justify-start h-12 text-lg hover:text-primary-600">FAQ</Button>
              </Link>
              
              {!isAuthenticated && (
                <>
                  <div className="my-4 border-t border-neutral-1000/60" />
                  <Link to="/signup" onClick={handleMobileNavClick}>
                    <Button className="w-full h-12 text-lg">Request Access</Button>
                  </Link>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
})
