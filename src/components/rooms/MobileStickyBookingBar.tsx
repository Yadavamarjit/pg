import React from 'react'
import { motion } from 'framer-motion'
import { Sparkles, CalendarCheck } from 'lucide-react'
import type { Room } from '@/types'

interface MobileStickyBookingBarProps {
  room: Room
  onScheduleVisit: () => void
  onRequestPrice: () => void
}

export const MobileStickyBookingBar: React.FC<MobileStickyBookingBarProps> = ({
  room,
  onScheduleVisit,
  onRequestPrice,
}) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 380, damping: 28 }}
      className="md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-black/[0.08] bg-white/95 px-4 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <span className="block truncate text-xs font-bold text-[#1A202C]">{room.title}</span>
          <div className="mt-0.5 flex items-center gap-1.5">
            <span className="inline-block rounded-full bg-[var(--color-primary)]/10 px-2 py-0.5 text-[10px] font-bold text-[var(--color-primary)]">
              Price on Request
            </span>
            <span className="text-[10px] text-[#64748B]">Zero Brokerage</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onRequestPrice}
            className="animate-shimmer-sheen flex min-h-[44px] items-center gap-1 rounded-xl bg-[#124000] px-3.5 py-2.5 text-center text-xs font-bold text-white shadow-sm active:scale-95"
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>Price</span>
          </button>

          <button
            onClick={onScheduleVisit}
            className="flex min-h-[44px] items-center gap-1 rounded-xl bg-[#F35600] px-4 py-2.5 text-center text-xs font-bold text-white shadow-sm active:scale-95"
          >
            <CalendarCheck className="h-3.5 w-3.5" />
            <span>Visit</span>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
