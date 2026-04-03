import { Routes, Route } from "react-router-dom"

import Nav from './components/Nav'
import Hero from './components/Hero'
import LogoBar from './components/LogoBar'
import Stats from './components/Stats'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import CTASection from './components/CTASection'
import Footer from './components/Footer'

import AuthPage from './pages/AuthPage'

// Home page (tera current UI)
function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <LogoBar />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: '#f2f2f3' }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
      </Routes>
    </div>
  )
}
