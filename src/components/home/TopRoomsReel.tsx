import React, { useState, useRef } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import type { Room } from '@/types'
import {
  Star,
  ChevronRight,
  BedDouble,
  Heart,
  Sparkles,
  MoveRight,
  Scale,
} from 'lucide-react'

interface TopRoomsReelProps {
  rooms: Room[]
  onSelectRoom: (roomId: string) => void
  onViewAll: () => void
  savedRoomIds?: string[]
  onToggleSave?: (roomId: string) => void
  onInquirePrice?: (roomId: string) => void
  comparedRoomIds?: string[]
  onToggleCompare?: (roomId: string) => void
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 24 },
  },
}

export const TopRoomsReel: React.FC<TopRoomsReelProps> = ({
  rooms,
  onSelectRoom,
  onViewAll,
  savedRoomIds = [],
  onToggleSave,
  onInquirePrice,
  comparedRoomIds = [],
  onToggleCompare,
}) => {
  const [burstingRoomId, setBurstingRoomId] = useState<string | null>(null)
  const [hasScrolled, setHasScrolled] = useState(false)
  const lastTapRef = useRef<{ [key: string]: number }>({})

  const handleCardTouchEnd = (roomId: string, e: React.TouchEvent | React.MouseEvent) => {
    const now = Date.now()
    const last = lastTapRef.current[roomId] || 0
    if (now - last < 320) {
      e.stopPropagation()
      setBurstingRoomId(roomId)
      setTimeout(() => setBurstingRoomId(null), 850)
      onToggleSave?.(roomId)
      if (typeof window !== 'undefined' && window.navigator?.vibrate) {
        window.navigator.vibrate([15, 35, 15])
      }
    }
    lastTapRef.current[roomId] = now
  }

  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center justify-between px-1">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight text-[#1A202C] md:text-xl">
              Top Available Rooms
            </h2>
            <span className="hidden items-center gap-1 rounded-full bg-[var(--color-accent)]/10 px-2 py-0.5 text-[10px] font-bold text-[var(--color-accent)] sm:inline-flex">
              <Sparkles className="h-3 w-3" /> Featured
            </span>
          </div>
          <p className="text-xs text-[#64748B] md:text-sm">
            Handpicked spaces with immediate move-in availability
          </p>
        </div>

        <button
          onClick={onViewAll}
          style={{ color: 'var(--color-primary)' }}
          className="flex items-center gap-1 text-xs font-bold transition-colors hover:opacity-80 md:text-sm"
        >
          View All <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Floating Mobile 'Swipe to Explore' Hint */}
      {!hasScrolled && (
        <div className="mb-2 flex items-center gap-1 text-[11px] font-medium text-[var(--color-accent)] sm:hidden">
          <motion.span
            animate={{ x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="flex items-center gap-1 font-semibold"
          >
            Swipe to explore rooms <MoveRight className="h-3.5 w-3.5" />
          </motion.span>
        </div>
      )}

      {/* Reel container: Horizontal snap scroll on mobile, responsive grid on tablets/desktops */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        onScroll={() => setHasScrolled(true)}
        className="no-scrollbar flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:pb-0"
      >
        {rooms.map((room) => {
          const isSaved = savedRoomIds.includes(room.id)
          const isCompared = comparedRoomIds.includes(room.id)
          const isBursting = burstingRoomId === room.id

          return (
            <motion.div
              key={room.id}
              layoutId={`room-card-${room.id}`}
              variants={cardVariants}
              whileHover={{ y: -6, scale: 1.015 }}
              whileTap={{ scale: 0.985 }}
              onClick={() => onSelectRoom(room.id)}
              onTouchEnd={(e) => handleCardTouchEnd(room.id, e)}
              className="transform-gpu will-change-transform relative flex w-[290px] shrink-0 snap-center cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-black/[0.05] bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] transition-all hover:shadow-2xl sm:w-auto"
            >
              <div>
                <motion.div layoutId={`room-image-${room.id}`} className="relative h-44 overflow-hidden sm:h-48">
                  <img
                    src={room.images[0]}
                    alt={room.title}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    style={{
                      maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
                      WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 82%, rgba(0,0,0,0) 100%)',
                    }}
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-white via-white/40 to-transparent" />

                  {/* Top Left Layout Badge + Guest Favorite */}
                  <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-1.5">
                    <span
                      style={{ backgroundColor: 'var(--color-primary)' }}
                      className="rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wider text-white uppercase backdrop-blur-md"
                    >
                      {room.typeLabel}
                    </span>

                    {room.rating >= 4.9 && (
                      <span className="flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-50/95 px-2 py-0.5 text-[10px] font-extrabold text-amber-900 shadow-sm backdrop-blur-md">
                        <Sparkles className="h-3 w-3 fill-amber-500 text-amber-500" /> Favorite
                      </span>
                    )}
                  </div>

                  {/* Top Right: Rating, Compare & Heart Save Button */}
                  <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
                    <div className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-[#1A202C] shadow-sm backdrop-blur-md">
                      <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      {room.rating}
                    </div>

                    {onToggleCompare && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          onToggleCompare(room.id)
                          if (typeof window !== 'undefined' && window.navigator?.vibrate) {
                            window.navigator.vibrate(10)
                          }
                        }}
                        className={`flex h-7 w-7 items-center justify-center rounded-full shadow-sm backdrop-blur-md transition-all active:scale-75 ${
                          isCompared
                            ? 'bg-[var(--color-primary)] text-white'
                            : 'bg-white/95 text-[#64748B] hover:text-[var(--color-primary)]'
                        }`}
                        title="Compare space"
                        aria-label="Compare space"
                      >
                        <Scale className="h-3.5 w-3.5" />
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onToggleSave?.(room.id)
                        if (typeof window !== 'undefined' && window.navigator?.vibrate) {
                          window.navigator.vibrate(12)
                        }
                      }}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur-md transition-transform active:scale-75"
                      aria-label="Save room to favorites"
                    >
                      <Heart
                        className={`h-3.5 w-3.5 transition-colors ${
                          isSaved ? 'fill-[#F35600] text-[#F35600]' : 'text-[#64748B] hover:text-[#F35600]'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Double-Tap Heart Burst */}
                  <AnimatePresence>
                    {isBursting && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.4, 1], opacity: [0, 1, 1, 0] }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.85, ease: 'easeOut' }}
                        className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
                      >
                        <div className="relative flex items-center justify-center">
                          <Heart className="h-16 w-16 fill-[#F35600] text-[#F35600] drop-shadow-[0_8px_20px_rgba(243,86,0,0.6)]" />
                          {[0, 60, 120, 180, 240, 300].map((deg) => (
                            <motion.div
                              key={deg}
                              initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                              animate={{
                                scale: [0, 1, 0],
                                x: Math.cos((deg * Math.PI) / 180) * 45,
                                y: Math.sin((deg * Math.PI) / 180) * 45,
                                opacity: [1, 1, 0],
                              }}
                              transition={{ duration: 0.8, ease: 'easeOut' }}
                              className="absolute h-2 w-2 rounded-full bg-amber-300"
                            />
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                <div className="p-4">
                  <motion.h3 layoutId={`room-title-${room.id}`} className="mb-1 truncate text-base font-bold text-[#1A202C]">
                    {room.title}
                  </motion.h3>
                  <div className="mb-3 flex items-center gap-3 text-xs text-[#64748B]">
                    <span className="flex items-center gap-1">
                      <BedDouble className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
                      {room.bedsAvailable} Bed
                    </span>
                    <span>•</span>
                    <span className="font-semibold" style={{ color: 'var(--color-secondary)' }}>{room.availableFrom}</span>
                  </div>
                </div>
              </div>

              {/* Shimmering Price on Request & Action */}
              <div className="p-4 pt-0">
                <div className="flex items-center justify-between border-t border-[var(--color-primary)]/10 pt-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      if (onInquirePrice) {
                        onInquirePrice(room.id)
                      } else {
                        onSelectRoom(room.id)
                      }
                    }}
                    className="animate-shimmer-sheen group flex items-center gap-1.5 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/5 px-3 py-1 text-xs font-semibold text-[var(--color-primary)] transition-transform active:scale-95 hover:bg-[var(--color-primary)]/10"
                  >
                    <span>Price on Request</span>
                    <Sparkles className="h-3 w-3 text-[var(--color-accent)] transition-transform group-hover:rotate-12" />
                  </button>

                  <span className="text-xs font-bold hover:underline" style={{ color: 'var(--color-accent)' }}>
                    View Details →
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
