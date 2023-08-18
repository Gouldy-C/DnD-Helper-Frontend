import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import AuthProvider from './contexts/UserContext.tsx'
import { AlertProvider } from './contexts/AlertContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AlertProvider>
      <AuthProvider>
        
        <App />
        
      </AuthProvider>
    </AlertProvider>
  </React.StrictMode>,
)
