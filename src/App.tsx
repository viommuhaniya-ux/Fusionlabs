import Nav from './components/Nav'
import Hero from './components/Hero'
import LogoBar from './components/LogoBar'
import Stats from './components/Stats'
import Features from './components/Features'
import HowItWorks from './components/HowItWorks'
import Testimonials from './components/Testimonials'
import CTASection from './components/CTASection'
import Footer from './components/Footer'
import Auth from './pages/AuthPage'

export default function App() {
  return (
    <div className="min-h-screen" style={{ background: '#f2f2f3' }}>
      <Nav />
      <Hero />
      <LogoBar />
      <Stats />
      <Features />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <Footer />
    </div>
  )
}
