import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Suspense, lazy } from "react"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ScrollToTop } from "@/components/ScrollToTop"
import { ProtectedRoute } from "@/auth"
import { LoadingSpinner } from "@/components/ui/loading-spinner"

const Home = lazy(() => import("@/pages/Home"))
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"))
const TermsOfService = lazy(() => import("@/pages/TermsOfService"))
const DataUsagePolicy = lazy(() => import("@/pages/DataUsagePolicy"))
const Team = lazy(() => import("@/pages/Team"))
const Mission = lazy(() => import("@/pages/Mission"))
const Blog = lazy(() => import("@/pages/Blog"))
const FAQ = lazy(() => import("@/pages/FAQ"))
const SignIn = lazy(() => import("@/pages/SignIn"))
const SignUp = lazy(() => import("@/pages/SignUp"))
const ForgotPassword = lazy(() => import("@/pages/ForgotPassword"))
const Profile = lazy(() => import("@/pages/Profile"))
const SampleReport = lazy(() => import("@/pages/SampleReport"))

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col font-sans relative overflow-x-hidden bg-background">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 -z-10 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float -z-10 pointer-events-none" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float -z-10 pointer-events-none"
          style={{ animationDelay: '2s' }}
        />
        <Navbar />
        <div className="flex-1">
          <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/data-usage-policy" element={<DataUsagePolicy />} />
            <Route path="/team" element={<Team />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<Blog />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/sample-report" element={<SampleReport />} />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
