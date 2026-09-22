import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Search, Calendar, User } from 'lucide-react'

interface BottomNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'rooms', label: 'Search', icon: Search },
    { id: 'bookings', label: 'Bookings', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Pull dock down when scrolling down past 40px
      if (currentScrollY > lastScrollY.current && currentScrollY > 40) {
        setIsVisible(false)
      } else {
        // Show dock when scrolling up
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY

      // When scrolling stops for 350ms, bring dock smoothly back up
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
      scrollTimeout.current = setTimeout(() => {
        setIsVisible(true)
      }, 350)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current)
    }
  }, [])

  return (
    <AnimatePresence>
      <div className="pointer-events-none fixed inset-x-4 bottom-6 z-40 mx-auto max-w-[260px] md:hidden">
        <motion.nav
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: isVisible ? 0 : 90,
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.95,
          }}
          transition={{
            type: 'spring',
            stiffness: 380,
            damping: 28,
          }}
          style={{ backdropFilter: 'blur(21px)', WebkitBackdropFilter: 'blur(21px)' }}
          className="pointer-events-auto flex items-center justify-around rounded-full border border-white/70 bg-white/45 px-3 py-2 shadow-[0_16px_40px_-6px_rgba(33,73,86,0.18)]"
        >
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id)
                  if (typeof window !== 'undefined' && window.navigator?.vibrate) {
                    window.navigator.vibrate(10)
                  }
                }}
                aria-label={item.label}
                className="relative flex items-center justify-center rounded-full p-2.5 transition-transform focus:outline-none active:scale-90"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeBottomNavIconCircle"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                    className="absolute inset-0 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}

                <Icon
                  className={`relative z-10 h-5 w-5 transition-all ${
                    isActive ? 'scale-110 text-white' : 'text-[var(--color-primary)]/70 hover:text-[var(--color-primary)]'
                  }`}
                />
              </button>
            )
          })}
        </motion.nav>
      </div>
    </AnimatePresence>
  )
}
