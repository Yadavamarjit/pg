import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Search, Heart, Calendar, User } from 'lucide-react'

interface BottomNavProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  savedCount?: number
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  setActiveTab,
  savedCount = 0,
}) => {
  const [isVisible, setIsVisible] = useState(true)
  const lastScrollY = useRef(0)
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null)

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'rooms', label: 'Explore', icon: Search },
    { id: 'saved', label: 'Saved', icon: Heart, count: savedCount },
    { id: 'bookings', label: 'Visits', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: User },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Pull dock down when scrolling down fast past 50px
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false)
      } else {
        // Show dock when scrolling up
        setIsVisible(true)
      }

      lastScrollY.current = currentScrollY

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
      <div className="pointer-events-none fixed inset-x-3 bottom-5 z-40 mx-auto max-w-[320px] md:hidden">
        <motion.nav
          initial={{ y: 0, opacity: 1 }}
          animate={{
            y: isVisible ? 0 : 90,
            opacity: isVisible ? 1 : 0,
            scale: isVisible ? 1 : 0.94,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
          }}
          style={{ backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)' }}
          className="pointer-events-auto flex items-center justify-around rounded-full border border-white/80 bg-white/65 px-2 py-1.5 shadow-[0_16px_40px_-6px_rgba(33,73,86,0.22)]"
        >
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            const hasBadge = !!item.count && item.count > 0

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
                className="relative flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full p-2 transition-transform focus:outline-none active:scale-90 transform-gpu will-change-transform"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeBottomNavPill"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                    className="absolute inset-0 rounded-full shadow-md"
                    transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                  />
                )}

                <div className="relative">
                  <Icon
                    className={`relative z-10 h-5 w-5 transition-transform duration-200 ${
                      isActive ? 'scale-110 text-white' : 'text-[var(--color-primary)]/75 hover:text-[var(--color-primary)]'
                    }`}
                  />

                  {/* Live Saved Badge */}
                  {hasBadge && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className={`absolute -top-1.5 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[9px] font-black shadow-sm ${
                        isActive
                          ? 'bg-amber-300 text-[#1A202C]'
                          : 'bg-[#F35600] text-white'
                      }`}
                    >
                      {item.count}
                    </motion.span>
                  )}
                </div>
              </button>
            )
          })}
        </motion.nav>
      </div>
    </AnimatePresence>
  )
}
