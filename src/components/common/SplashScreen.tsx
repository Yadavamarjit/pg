import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ShieldCheck, Wifi } from 'lucide-react'

interface SplashScreenProps {
  onComplete?: () => void
  durationMs?: number
}

export const SplashScreen: React.FC<SplashScreenProps> = ({
  onComplete,
  durationMs = 2500,
}) => {
  const [isDismissing, setIsDismissing] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Lock scroll during splash screen
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const timer = setTimeout(() => {
      handleDismiss()
    }, durationMs)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = originalOverflow
    }
  }, [durationMs])

  const handleDismiss = () => {
    if (isDismissing) return
    setIsDismissing(true)
    setTimeout(() => {
      setIsVisible(false)
    }, 280)
  }

  return (
    <AnimatePresence
      onExitComplete={() => {
        if (onComplete) onComplete()
      }}
    >
      {isVisible && (
        <motion.div
          key="bhagwati-splash-overlay"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.65, ease: [0.76, 0, 0.24, 1] },
          }}
          onClick={handleDismiss}
          style={{ backgroundColor: '#FAF6F0' }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden p-4 sm:p-6 select-none cursor-pointer w-full max-w-full shadow-2xl"
        >
          {/* Ambient Luxury Radial Glow Orbs */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: [0.9, 1.2, 1],
              opacity: [0.22, 0.38, 0.28],
            }}
            transition={{ duration: 3.2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="pointer-events-none absolute -top-12 h-[420px] w-[420px] sm:h-[520px] sm:w-[520px] rounded-full bg-[var(--color-primary)] blur-3xl"
          />
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{
              scale: [0.85, 1.25, 0.95],
              opacity: [0.18, 0.32, 0.24],
            }}
            transition={{ duration: 3.4, delay: 0.3, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            className="pointer-events-none absolute -bottom-16 h-[380px] w-[380px] sm:h-[480px] sm:w-[480px] rounded-full bg-[var(--color-accent)] blur-3xl"
          />

          {/* Center Brand Container */}
          <motion.div
            animate={{
              opacity: isDismissing ? 0 : 1,
              scale: isDismissing ? 0.94 : 1,
              y: isDismissing ? -15 : 0,
            }}
            transition={{ duration: 0.25, ease: 'easeIn' }}
            className="relative z-10 flex w-full max-w-sm flex-col items-center text-center px-4"
          >
            {/* Animated Logo Presentation */}
            <div className="relative mb-6 sm:mb-8 flex items-center justify-center">
              {/* Expanding glowing radar rings */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0.8 }}
                animate={{ scale: [1, 1.45, 1.85], opacity: [0.7, 0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
                className="absolute h-36 w-36 sm:h-44 sm:w-44 rounded-full border-2 border-[var(--color-accent)]/45"
              />
              <motion.div
                initial={{ scale: 0.8, opacity: 0.6 }}
                animate={{ scale: [1, 1.3, 1.6], opacity: [0.6, 0.22, 0] }}
                transition={{ duration: 2, delay: 0.45, repeat: Infinity, ease: 'easeOut' }}
                className="absolute h-36 w-36 sm:h-44 sm:w-44 rounded-full bg-[var(--color-primary)]/15 blur-sm"
              />

              {/* Central Premium Logo Box */}
              <motion.div
                initial={{ scale: 0.5, opacity: 0, y: 30 }}
                animate={{
                  scale: 1,
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 22,
                  delay: 0.1,
                }}
                className="relative flex h-32 w-32 sm:h-36 sm:w-36 items-center justify-center overflow-hidden rounded-3xl border-2 border-[#214956]/20 bg-white p-3.5 sm:p-4 shadow-[0_24px_55px_-10px_rgba(33,73,86,0.28)]"
              >
                {/* Breathing Logo Icon */}
                <motion.img
                  animate={{
                    scale: [1, 1.04, 1],
                  }}
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  src="/assets/logo.png"
                  alt="Bhagwati Homes Logo"
                  style={{ filter: 'invert(1)', mixBlendMode: 'multiply' }}
                  className="h-full w-full object-contain"
                />

                {/* Shimmer Sheen on Logo */}
                <div className="pointer-events-none absolute inset-0 animate-shimmer-sheen" />
              </motion.div>
            </div>

            {/* Brand Title Animation */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              className="space-y-1.5"
            >
              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-[var(--color-primary)]">
                Bhagwati Homes
              </h1>

              <div className="flex items-center justify-center gap-2">
                <span className="h-[1.5px] w-6 bg-[var(--color-accent)]" />
                <span className="text-[10px] sm:text-xs font-bold tracking-widest text-[#64748B] uppercase">
                  Premium Co-Living & Luxury PG
                </span>
                <span className="h-[1.5px] w-6 bg-[var(--color-accent)]" />
              </div>
            </motion.div>

            {/* Trust Tags */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="mt-6 flex flex-wrap items-center justify-center gap-2 text-[11px] font-bold text-[#1A202C]"
            >
              <span className="inline-flex items-center gap-1 rounded-full border border-black/[0.08] bg-white/95 px-3 py-1 shadow-sm backdrop-blur-sm">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" /> Zero Brokerage
              </span>
              <span className="inline-flex items-center gap-1 rounded-full border border-black/[0.08] bg-white/95 px-3 py-1 shadow-sm backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-[var(--color-accent)] shrink-0" /> 3-Time Chef Meals
              </span>
              <span className="hidden xs:inline-flex items-center gap-1 rounded-full border border-black/[0.08] bg-white/95 px-3 py-1 shadow-sm backdrop-blur-sm">
                <Wifi className="h-3.5 w-3.5 text-[var(--color-primary)] shrink-0" /> 300 Mbps Wi-Fi
              </span>
            </motion.div>

            {/* Sleek Progress Fill Bar */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 160 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="mt-8 h-1 overflow-hidden rounded-full bg-[var(--color-primary)]/15"
            >
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: (durationMs - 400) / 1000, ease: 'easeInOut' }}
                className="h-full rounded-full bg-[var(--color-accent)]"
              />
            </motion.div>

            {/* Skip hint */}
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.75 }}
              className="mt-4 text-[11px] font-medium text-[#64748B]"
            >
              Tap anywhere to enter →
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
