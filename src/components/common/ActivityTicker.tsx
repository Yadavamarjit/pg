import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronRight } from 'lucide-react'

interface ActivityTickerProps {
  onActionClick?: () => void
}

const activities = [
  {
    icon: '⚡',
    badge: 'Just Booked',
    text: 'Sneha from HSR Layout scheduled a visit for Suite 302',
    time: '2m ago',
    type: 'success',
  },
  {
    icon: '🔥',
    badge: 'High Demand',
    text: 'Indiranagar Deluxe Studio: Only 1 room remaining',
    time: 'Live',
    type: 'urgent',
  },
  {
    icon: '✨',
    badge: 'Trust Guarantee',
    text: 'Zero Brokerage & 100% Refundable Security Deposit',
    time: 'Verified',
    type: 'trust',
  },
  {
    icon: '⭐',
    badge: 'Top Rated',
    text: '4.9/5 resident satisfaction from 140+ techies & students',
    time: 'Bengaluru',
    type: 'social',
  },
]

export const ActivityTicker: React.FC<ActivityTickerProps> = ({ onActionClick }) => {
  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % activities.length)
    }, 5500)
    return () => clearInterval(interval)
  }, [])

  if (!isVisible) return null

  const current = activities[index]

  return (
    <div className="relative z-30 mx-auto mb-4 w-full max-w-7xl px-2 sm:px-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-2xl border border-[var(--color-primary)]/10 bg-white/85 p-2 px-3 shadow-[0_4px_20px_-4px_rgba(33,73,86,0.08)] backdrop-blur-md sm:px-4"
      >
        {/* Shimmer Ambient Sheen */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-[var(--color-accent)]/5 to-transparent animate-shimmer-sheen" />

        <div className="flex items-center justify-between gap-2">
          {/* Beacon + Content */}
          <div
            onClick={onActionClick}
            className="flex min-w-0 flex-1 cursor-pointer items-center gap-2.5 transition-opacity hover:opacity-90"
          >
            {/* Live pulsating beacon */}
            <div className="relative flex h-2.5 w-2.5 shrink-0 items-center justify-center">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -12, filter: 'blur(4px)' }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden text-xs"
              >
                <span className="shrink-0 rounded-full bg-[var(--color-primary)]/10 px-2 py-0.5 text-[10px] font-bold text-[var(--color-primary)] uppercase">
                  {current.badge}
                </span>

                <span className="truncate font-medium text-[#1A202C]">
                  {current.text}
                </span>

                <span className="hidden shrink-0 font-mono text-[10px] text-[#64748B] sm:inline">
                  • {current.time}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Action indicator & close */}
          <div className="flex shrink-0 items-center gap-1">
            {onActionClick && (
              <button
                onClick={onActionClick}
                className="flex items-center gap-0.5 rounded-lg px-2 py-1 text-[11px] font-bold text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-colors"
              >
                <span className="hidden xs:inline">Inquire</span>
                <ChevronRight className="h-3 w-3" />
              </button>
            )}
            <button
              onClick={() => setIsVisible(false)}
              className="rounded-full p-1 text-[#64748B] hover:bg-black/5 transition-colors"
              aria-label="Dismiss banner"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
