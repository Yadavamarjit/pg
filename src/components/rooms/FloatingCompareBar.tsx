import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Scale, ArrowRight, X } from 'lucide-react'
import type { Room } from '@/types'

interface FloatingCompareBarProps {
  comparedRooms: Room[]
  onOpenComparison: () => void
  onClearComparison: () => void
}

export const FloatingCompareBar: React.FC<FloatingCompareBarProps> = ({
  comparedRooms,
  onOpenComparison,
  onClearComparison,
}) => {
  if (comparedRooms.length === 0) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 80, opacity: 0, scale: 0.95 }}
        transition={{ type: 'spring', stiffness: 420, damping: 30 }}
        className="fixed bottom-24 sm:bottom-8 left-4 right-4 z-40 mx-auto max-w-lg"
      >
        <div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--color-primary)]/20 bg-slate-950/90 p-2.5 sm:p-3 text-white shadow-2xl backdrop-blur-xl">
          {/* Thumbnails of compared rooms */}
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="flex -space-x-2 overflow-hidden shrink-0">
              {comparedRooms.map((room) => (
                <img
                  key={room.id}
                  src={room.images[0]}
                  alt={room.title}
                  className="inline-block h-9 w-9 rounded-xl object-cover ring-2 ring-slate-950 shadow-sm"
                />
              ))}
            </div>

            <div className="min-w-0">
              <span className="block text-xs font-bold truncate text-white">
                {comparedRooms.length} Space{comparedRooms.length > 1 ? 's' : ''} in Comparison
              </span>
              <span className="text-[10px] text-white/70 truncate block">
                {comparedRooms.map((r) => r.typeLabel).join(' vs ')}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1.5 shrink-0">
            <button
              onClick={onOpenComparison}
              className="animate-shimmer-sheen flex items-center gap-1.5 rounded-xl bg-[var(--color-accent)] px-3.5 py-2 text-xs font-bold text-white shadow-md hover:brightness-110 active:scale-95"
            >
              <Scale className="h-3.5 w-3.5" />
              <span>Compare</span>
              <ArrowRight className="h-3 w-3" />
            </button>

            <button
              onClick={onClearComparison}
              className="rounded-xl p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
              title="Clear comparison"
              aria-label="Clear comparison"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
