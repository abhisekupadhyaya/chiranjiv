import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Mission from './pages/Mission'
import BlogIndex from './pages/BlogIndex'
import BlogPost from './pages/BlogPost'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import DataUsagePolicy from './pages/DataUsagePolicy'
import { Layout } from '@/components/layout'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/mission" element={<Mission />} />
        <Route path="/blog" element={<BlogIndex />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/privacy/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/privacy/terms-of-service" element={<TermsOfService />} />
        <Route path="/privacy/data-usage-policy" element={<DataUsagePolicy />} />
      </Route>
    </Routes>
  )
}

export default App
