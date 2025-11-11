import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import TestimonialsPage from './pages/Testimonials.jsx'
import EstimatorPage from './pages/Estimator.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/estimator" element={<EstimatorPage />} />
      </Routes>
    </BrowserRouter>
  )
}
