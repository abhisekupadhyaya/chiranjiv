import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Mission from './pages/Mission'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import LHPostIndex from './pages/LHPostIndex'
import LHPost from './pages/LHPost'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import DataUsagePolicy from './pages/DataUsagePolicy'
import Team from './pages/Team'
import FAQ from './pages/FAQ'
import SampleReport from './pages/SampleReport'
import { Layout } from '@/components/layout'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/learning-hub" element={<LHPostIndex />} />
        <Route path="/learning-hub/:slug" element={<LHPost />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-service" element={<TermsOfService />} />
        <Route path="/data-usage-policy" element={<DataUsagePolicy />} />
        <Route path="/team" element={<Team />} />
        <Route path="/faq" element={<FAQ />} />
      </Route>
      <Route path="/sample-report" element={<SampleReport />} />
    </Routes>
  )
}

export default App
