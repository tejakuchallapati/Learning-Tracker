import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import '../styles/index.css'
import { AuthProvider } from '../context/AuthContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { initAnalytics } from '../utils/analytics'

initAnalytics();

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '937868886257-sgoqf4onr843odrv2518eghvog3ppm97.apps.googleusercontent.com';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)
