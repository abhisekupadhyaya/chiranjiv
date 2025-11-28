import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import TagManager from 'react-gtm-module'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from '@/auth'
import { config } from '@/config/env'

if (config.gtmId) {
  TagManager.initialize({ gtmId: config.gtmId })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
)
