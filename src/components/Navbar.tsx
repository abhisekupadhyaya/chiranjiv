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
  }

  const handleSignOut = async () => {
    await logout();
    navigate('/');
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
        
        <nav className="hidden md:flex items-center gap-2 text-sm font-medium text-neutral-600">
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
              <DropdownMenuItem asChild className="rounded-lg hover:bg-neutral-100/80 focus:bg-neutral-100/80 text-neutral-600 hover:text-primary-600 cursor-pointer">
                <Link to="/team" className="w-full px-3 py-2">Team</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-lg hover:bg-neutral-100/80 focus:bg-neutral-100/80 text-neutral-600 hover:text-primary-600 cursor-pointer">
                <Link to="/mission" className="w-full px-3 py-2">Mission</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="rounded-lg hover:bg-neutral-100/80 focus:bg-neutral-100/80 text-neutral-600 hover:text-primary-600 cursor-pointer">
                <Link to="/blog" className="w-full px-3 py-2">Blog</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" className="hover:text-primary-600" onClick={() => handleHashNavigation('#how-it-works')}>How It Works</Button>
          <Button variant="ghost" className="hover:text-primary-600" onClick={() => handleHashNavigation('#why-chiranjiv')}>Why Us</Button>
          
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
               <DropdownMenuItem asChild className="rounded-lg hover:bg-neutral-100/80 focus:bg-neutral-100/80 text-neutral-600 hover:text-primary-600 cursor-pointer">
                 <Link to="/profile" className="w-full px-3 py-2">My Profile</Link>
               </DropdownMenuItem>
               <DropdownMenuItem className="rounded-lg hover:bg-neutral-100/80 focus:bg-neutral-100/80 text-neutral-600 hover:text-primary-600 cursor-pointer" onClick={handleSignOut}>
                 <span className="w-full px-3 py-2">Sign Out</span>
               </DropdownMenuItem>
             </DropdownMenuContent>
           </DropdownMenu>
          ) : (
            <Link to="/signin">
              <Button variant="ghost" className="hover:text-primary-600">Sign In</Button>
            </Link>
          )}

          <Link to="/faq">
            <Button variant="ghost" className="hover:text-primary-600">FAQ</Button>
          </Link>
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {!isAuthenticated && (
             <Button onClick={() => handleHashNavigation('#waitlist')}>Join Waitlist</Button>
          )}
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6 text-neutral-600" />
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
                    <Link to="/team">
                      <Button variant="ghost" className="justify-start h-10 text-base hover:text-primary-600 w-full">Team</Button>
                    </Link>
                    <Link to="/mission">
                      <Button variant="ghost" className="justify-start h-10 text-base hover:text-primary-600 w-full">Mission</Button>
                    </Link>
                    <Link to="/blog">
                      <Button variant="ghost" className="justify-start h-10 text-base hover:text-primary-600 w-full">Blog</Button>
                    </Link>
                  </div>
                )}
              </div>
              <Button variant="ghost" className="justify-start h-12 text-lg hover:text-primary-600" onClick={() => handleHashNavigation('#how-it-works')}>How It Works</Button>
              <Button variant="ghost" className="justify-start h-12 text-lg hover:text-primary-600" onClick={() => handleHashNavigation('#why-chiranjiv')}>Why Us</Button>
              
              {isAuthenticated ? (
                <>
                   <Link to="/profile">
                    <Button variant="ghost" className="justify-start h-12 text-lg hover:text-primary-600 w-full">Profile</Button>
                  </Link>
                  <Button variant="ghost" className="justify-start h-12 text-lg hover:text-primary-600 w-full" onClick={handleSignOut}>Sign Out</Button>
                </>
              ) : (
                <Link to="/signin">
                  <Button variant="ghost" className="justify-start h-12 text-lg hover:text-primary-600 w-full">Sign In</Button>
                </Link>
              )}
             
              <Link to="/faq">
                <Button variant="ghost" className="justify-start h-12 text-lg hover:text-primary-600">FAQ</Button>
              </Link>
              
              {!isAuthenticated && (
                <>
                  <div className="my-4 border-t border-neutral-1000/60" />
                  <Button className="w-full h-12 text-lg" onClick={() => handleHashNavigation('#waitlist')}>Join Waitlist</Button>
                </>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
})
