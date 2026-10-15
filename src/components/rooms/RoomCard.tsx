import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Room } from '@/types'
import {
  Star,
  Bath,
  Wifi,
  Sparkles,
  Check,
  ChevronRight,
  ChevronLeft,
  Heart,
  Scale,
  Award,
} from 'lucide-react'

interface RoomCardProps {
  room: Room
  onSelect: (roomId: string) => void
  onScheduleVisit: (roomId: string, e: React.MouseEvent) => void
  isSaved?: boolean
  onToggleSave?: (roomId: string) => void
  onInquirePrice?: (roomId: string) => void
  isCompared?: boolean
  onToggleCompare?: (roomId: string) => void
}

export const RoomCard: React.FC<RoomCardProps> = ({
  room,
  onSelect,
  onScheduleVisit,
  isSaved = false,
  onToggleSave,
  onInquirePrice,
  isCompared = false,
  onToggleCompare,
}) => {
  const [showHeartBurst, setShowHeartBurst] = useState(false)
  const [imageIndex, setImageIndex] = useState(0)
  const lastTapRef = useRef<number>(0)
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: Date.now() }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return
    const touch = e.changedTouches[0]
    const dx = touch.clientX - touchStartRef.current.x
    const dy = touch.clientY - touchStartRef.current.y
    const dt = Date.now() - touchStartRef.current.time

    // Detect horizontal swipe on card image
    if (Math.abs(dx) > 35 && Math.abs(dy) < 55 && dt < 450) {
      e.stopPropagation()
      if (dx < 0) {
        setImageIndex((prev) => (prev + 1) % room.images.length)
      } else {
        setImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length)
      }
      if (typeof window !== 'undefined' && window.navigator?.vibrate) {
        window.navigator.vibrate(8)
      }
      touchStartRef.current = null
      return
    }

    // Double tap detection
    const now = Date.now()
    if (now - lastTapRef.current < 320) {
      e.stopPropagation()
      setShowHeartBurst(true)
      setTimeout(() => setShowHeartBurst(false), 850)
      onToggleSave?.(room.id)
      if (typeof window !== 'undefined' && window.navigator?.vibrate) {
        window.navigator.vibrate([15, 35, 15])
      }
    }
    lastTapRef.current = now
    touchStartRef.current = null
  }

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImageIndex((prev) => (prev - 1 + room.images.length) % room.images.length)
  }

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setImageIndex((prev) => (prev + 1) % room.images.length)
  }

  return (
    <motion.div
      layoutId={`room-card-${room.id}`}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      onClick={() => onSelect(room.id)}
      className="group transform-gpu will-change-transform relative mb-4 cursor-pointer overflow-hidden rounded-3xl border border-black/[0.05] bg-white shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] transition-all hover:shadow-2xl"
    >
      {/* Photo Viewport with Touch Swiping and Mini-Slider */}
      <motion.div
        layoutId={`room-image-${room.id}`}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="relative h-48 overflow-hidden sm:h-52"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={imageIndex}
            src={room.images[imageIndex] || room.images[0]}
            alt={`${room.title} - Photo ${imageIndex + 1}`}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.7 }}
            transition={{ duration: 0.2 }}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{
              maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 84%, rgba(0,0,0,0) 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 84%, rgba(0,0,0,0) 100%)',
            }}
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-white via-white/40 to-transparent" />

        {/* Top left badges: Layout + Guest Favorite */}
        <div className="absolute top-3 left-3 z-20 flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-[#214956]/90 px-2.5 py-1 text-[11px] font-bold tracking-wider text-white uppercase backdrop-blur-md">
            {room.typeLabel}
          </span>

          {room.rating >= 4.9 && (
            <span className="flex items-center gap-1 rounded-full border border-amber-400/40 bg-amber-50/95 px-2.5 py-0.5 text-[10px] font-black text-amber-900 shadow-sm backdrop-blur-md">
              <Award className="h-3 w-3 fill-amber-500 text-amber-600" /> Guest Favorite
            </span>
          )}

          {room.attachedBathroom && (
            <span className="hidden sm:flex items-center gap-1 rounded-full bg-[#124000]/90 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-md">
              <Bath className="h-3 w-3" /> Attached Bath
            </span>
          )}
        </div>

        {/* Top right: Star Rating, Compare & Heart Save */}
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
          <div className="flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-[#1A202C] shadow-sm backdrop-blur-md">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            {room.rating} <span className="text-[10px] text-[#64748B]">({room.reviewCount})</span>
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

        {/* In-Card Next / Prev Chevrons (Mobile tap + Desktop hover) */}
        {room.images.length > 1 && (
          <div className="opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
            <button
              onClick={handlePrevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#1A202C] shadow-md backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[#1A202C] shadow-md backdrop-blur-sm transition-transform hover:scale-110 active:scale-95"
              aria-label="Next photo"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Dynamic Pagination Dots */}
        {room.images.length > 1 && (
          <div className="pointer-events-none absolute bottom-11 left-0 right-0 z-20 flex items-center justify-center gap-1.5">
            {room.images.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === imageIndex ? 'w-4 bg-white shadow-sm' : 'w-1.5 bg-white/60'
                }`}
              />
            ))}
          </div>
        )}

        {/* Double-Tap Heart Burst */}
        <AnimatePresence>
          {showHeartBurst && (
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

        {/* Bottom overlay: Shimmering Price on Request & Move-in Availability */}
        <div className="absolute right-3 bottom-3 left-3 z-20 flex items-center justify-between text-[#1A202C]">
          <button
            onClick={(e) => {
              e.stopPropagation()
              if (onInquirePrice) {
                onInquirePrice(room.id)
              } else {
                onSelect(room.id)
              }
            }}
            className="animate-shimmer-sheen group/btn flex items-center gap-1.5 rounded-full border border-[var(--color-primary)]/20 bg-white/95 px-3 py-1 text-xs font-bold text-[#214956] shadow-sm backdrop-blur-sm transition-transform active:scale-95 hover:scale-105"
          >
            <span>Price on Request</span>
            <Sparkles className="h-3 w-3 text-[var(--color-accent)] transition-transform group-hover/btn:rotate-12" />
          </button>

          <span className="rounded-md border border-emerald-600/20 bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 shadow-sm">
            Available {room.availableFrom}
          </span>
        </div>
      </motion.div>

      {/* Card Details Body */}
      <div className="p-4 pt-3">
        <motion.h3 layoutId={`room-title-${room.id}`} className="mb-1 text-base font-bold text-[#1A202C] truncate">
          {room.title}
        </motion.h3>
        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-[#64748B]">
          {room.description}
        </p>

        {/* Feature Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {room.wifi && (
            <span className="inline-flex items-center gap-1 rounded-md border border-[var(--color-primary)]/10 bg-[var(--color-bg)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-primary)]">
              <Wifi className="h-3 w-3" /> 300 Mbps Wi-Fi
            </span>
          )}
          {room.ac && (
            <span className="inline-flex items-center gap-1 rounded-md border border-[var(--color-primary)]/10 bg-[var(--color-bg)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-primary)]">
              <Sparkles className="h-3 w-3" /> AC Fitted
            </span>
          )}
          {room.housekeeping && (
            <span className="inline-flex items-center gap-1 rounded-md border border-[var(--color-primary)]/10 bg-[var(--color-bg)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-primary)]">
              <Check className="h-3 w-3 text-[var(--color-secondary)]" /> Daily Housekeeping
            </span>
          )}
        </div>

        {/* Touch Target Actions */}
        <div className="flex items-center justify-between gap-2 border-t border-[var(--color-primary)]/10 pt-3">
          <button
            onClick={(e) => onScheduleVisit(room.id, e)}
            className="min-h-[44px] flex-1 rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-bg)] px-3 py-2.5 text-center text-xs font-bold text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)]/10 active:scale-95"
          >
            Schedule Visit
          </button>
          <button
            style={{ backgroundColor: 'var(--color-primary)' }}
            className="min-h-[44px] flex items-center gap-1 rounded-xl px-4 py-2.5 text-xs font-bold text-white transition-all hover:brightness-110 active:scale-95"
          >
            Details <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}
