import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "@/pages/Home"
import PrivacyPolicy from "@/pages/PrivacyPolicy"
import TermsOfService from "@/pages/TermsOfService"
import DataUsagePolicy from "@/pages/DataUsagePolicy"
import Team from "@/pages/Team"
import Mission from "@/pages/Mission"
import Blog from "@/pages/Blog"
import FAQ from "@/pages/FAQ"
import SignIn from "@/pages/SignIn"
import SignUp from "@/pages/SignUp"
import ForgotPassword from "@/pages/ForgotPassword"
import Profile from "@/pages/Profile"
import { Navbar } from "@/components/Navbar"
import { Footer } from "@/components/Footer"
import { ScrollToTop } from "@/components/ScrollToTop"
import { ProtectedRoute } from "@/auth"

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex min-h-screen flex-col font-sans relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 -z-10 pointer-events-none" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float -z-10 pointer-events-none" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float -z-10 pointer-events-none"
          style={{ animationDelay: '2s' }}
        />
        <Navbar />
        <div className="flex-1">
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
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
