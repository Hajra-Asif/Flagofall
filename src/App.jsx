import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'  
import CountryCardGrid from './components/CountryCard'
import CountryDetailPage from './components/CountryDetailPage'
import HeroSection from './components/HeroSection'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* "/" pe HeroSection + cards dono dikhenge */}
        <Route
          path="/"
          element={
            <>
              <HeroSection />
              <CountryCardGrid />
            </>
          }
        />
        {/* detail page pe sirf CountryDetailPage */}
        <Route path="/country/:id" element={<CountryDetailPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
