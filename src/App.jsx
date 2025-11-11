import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import TestimonialsPage from './pages/Testimonials.jsx'
import EstimatorPage from './pages/Estimator.jsx'
import ComponentsPage from './pages/Components.jsx'
import BlogPage from './pages/Blog.jsx'
import AboutPage from './pages/About.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route path="/estimator" element={<EstimatorPage />} />
        <Route path="/components" element={<ComponentsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  )
}
