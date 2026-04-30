import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import { ClerkProvider } from '@clerk/react'
import './index.css'
import App from './App.jsx'
import Login from './components/Login.jsx';
import Dashboard from './components/Dashboard.jsx';
import WeatherApp from './components/WeatherApp.jsx';
import Students from './components/Students.jsx';


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')).render(
  
  <ClerkProvider   publishableKey ={PUBLISHABLE_KEY} afterSignOutUrl="/login-page">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login-page" element={<Login />}/>
        <Route path="/dashboard" element={<Dashboard />}/>
        <Route path="/weather-app" element={<WeatherApp />}/>
        <Route path="/students" element={<Students/>}/>
      </Routes>
    </BrowserRouter>
  </ClerkProvider>

)
