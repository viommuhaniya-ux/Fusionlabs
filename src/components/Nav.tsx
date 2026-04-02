import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-out ${
          scrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          ref={navRef}
          className={`mx-4 lg:mx-auto max-w-[1200px] transition-all duration-700 ease-out ${
            scrolled
              ? 'bg-white/90 backdrop-blur-2xl rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-black/[0.04]'
              : ''
          }`}
        >
          <div className={`flex items-center justify-between px-5 transition-all duration-500 ${scrolled ? 'h-14' : 'h-16'}`}>
            {/* Logo */}
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-[#09090b] flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:rounded-lg">
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                  <path d="M13 3L4 14h7v7l9-11h-7V3z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-base font-bold tracking-tight transition-colors duration-300 group-hover:text-zinc-600">Fusion</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {['Features', 'How it Works', 'Pricing'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 text-[13px] font-medium text-[#52525b] rounded-lg hover:bg-black/[0.03] hover:text-[#09090b] transition-all duration-200"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="hidden sm:block text-[13px] font-medium text-[#52525b] hover:text-[#09090b] transition-colors duration-200"
              >
                Sign in
              </a>
              <a href="#">
                <span className="inline-flex bg-[#09090b] text-white text-[13px] font-medium px-5 py-2.5 rounded-full hover:bg-zinc-800 transition-all duration-300 hover:shadow-lg hover:shadow-black/10 hover:scale-105 active:scale-100">
                  Get Started
                </span>
              </a>
              <button
                className="md:hidden p-2 -mr-2 transition-transform duration-200 hover:scale-110 active:scale-95"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white"
          >
            <div className="flex items-center justify-between p-5">
              <a href="#" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#09090b] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none">
                    <path d="M13 3L4 14h7v7l9-11h-7V3z" fill="currentColor" />
                  </svg>
                </div>
                <span className="text-base font-bold tracking-tight">Fusion</span>
              </a>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 -mr-2 transition-transform duration-200 hover:scale-110 hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="px-5 py-8 space-y-6">
              {['Features', 'How it Works', 'Pricing'].map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                  className="block text-2xl font-medium hover:text-zinc-500 transition-colors"
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <a
                  href="#"
                  className="block text-2xl font-medium hover:text-zinc-500 transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  Sign in
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <a
                  href="#"
                  className="block w-full bg-[#09090b] text-white text-base font-medium py-4 rounded-2xl mt-8 hover:bg-zinc-800 transition-colors text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Get Started Free
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
