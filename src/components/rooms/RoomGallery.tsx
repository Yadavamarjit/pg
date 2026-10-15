import React, { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
  Grid,
} from 'lucide-react'

export const RoomGallery: React.FC<{ images: string[]; title: string }> = ({
  images,
  title,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const touchStartRef = useRef<{ x: number; y: number } | null>(null)

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return
    const dx = e.changedTouches[0].clientX - touchStartRef.current.x
    const dy = e.changedTouches[0].clientY - touchStartRef.current.y
    if (Math.abs(dx) > 35 && Math.abs(dy) < 55) {
      if (dx < 0) {
        handleNext()
      } else {
        handlePrev()
      }
      if (typeof window !== 'undefined' && window.navigator?.vibrate) {
        window.navigator.vibrate(8)
      }
    }
    touchStartRef.current = null
  }

  // Key navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'Escape') setIsLightboxOpen(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, handleNext, handlePrev])

  return (
    <>
      {/* DESKTOP: Airbnb-Style 5-Photo Mosaic Grid (md+) */}
      <div className="hidden md:block relative mb-6 overflow-hidden rounded-3xl bg-slate-950 shadow-soft-lg">
        <div className="grid grid-cols-4 gap-2 h-[390px] lg:h-[440px]">
          {/* Main Large Hero Image (2 cols) */}
          <div
            onClick={() => {
              setCurrentIndex(0)
              setIsLightboxOpen(true)
            }}
            className="group col-span-2 relative h-full cursor-pointer overflow-hidden rounded-l-2xl"
          >
            <img
              src={images[0]}
              alt={`${title} - Main Bedroom View`}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
          </div>

          {/* Secondary Grid (1 col with 2 images) */}
          <div className="col-span-1 grid grid-rows-2 gap-2 h-full">
            <div
              onClick={() => {
                setCurrentIndex(1 % images.length)
                setIsLightboxOpen(true)
              }}
              className="group relative h-full cursor-pointer overflow-hidden"
            >
              <img
                src={images[1] || images[0]}
                alt={`${title} - Photo 2`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>
            <div
              onClick={() => {
                setCurrentIndex(2 % images.length)
                setIsLightboxOpen(true)
              }}
              className="group relative h-full cursor-pointer overflow-hidden"
            >
              <img
                src={images[2] || images[0]}
                alt={`${title} - Photo 3`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>
          </div>

          {/* Third Grid (1 col with 2 images + "Show all photos" button) */}
          <div className="col-span-1 grid grid-rows-2 gap-2 h-full">
            <div
              onClick={() => {
                setCurrentIndex(3 % images.length)
                setIsLightboxOpen(true)
              }}
              className="group relative h-full cursor-pointer overflow-hidden rounded-tr-2xl"
            >
              <img
                src={images[3] || images[0]}
                alt={`${title} - Photo 4`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>
            <div
              onClick={() => {
                setCurrentIndex(0)
                setIsLightboxOpen(true)
              }}
              className="group relative h-full cursor-pointer overflow-hidden rounded-br-2xl"
            >
              <img
                src={images[images.length - 1] || images[0]}
                alt={`${title} - Photo 5`}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors" />
            </div>
          </div>
        </div>

        {/* Floating "Show All Photos" Button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-xl border border-black/10 bg-white/95 px-3.5 py-2 text-xs font-bold text-[#1A202C] shadow-md backdrop-blur-md transition-all hover:bg-white hover:scale-105 active:scale-95"
        >
          <Grid className="h-4 w-4" />
          <span>Show all {images.length} photos</span>
        </button>
      </div>

      {/* MOBILE: Swipeable Edge-to-Edge Hero Slider with Touch Swiping */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="md:hidden shadow-soft-lg group relative mb-6 h-64 sm:h-80 w-full overflow-hidden rounded-3xl bg-slate-900 select-none"
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt={`${title} - Photo ${currentIndex + 1}`}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            onClick={() => setIsLightboxOpen(true)}
            className="h-full w-full object-cover transform-gpu will-change-transform cursor-pointer"
          />
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

        {/* Photo Counter Pill (e.g. 1 / 4) */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1 rounded-full bg-black/65 px-3 py-1 text-[11px] font-mono font-bold text-white backdrop-blur-md">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Expand to Lightbox Button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-4 right-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#1A202C] shadow-md backdrop-blur-md active:scale-95"
          aria-label="Open fullscreen photo"
        >
          <Maximize2 className="h-4 w-4" />
        </button>

        {/* Navigation Arrows on Mobile */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute top-1/2 left-3 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#1A202C] shadow-md backdrop-blur-md active:scale-95"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute top-1/2 right-3 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-[#1A202C] shadow-md backdrop-blur-md active:scale-95"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dynamic Indicator Pills */}
        <div className="absolute right-0 bottom-4 left-0 z-20 flex items-center justify-center gap-1.5">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className="p-1 focus:outline-none"
            >
              <motion.div
                className={`h-1.5 rounded-full transition-colors ${
                  idx === currentIndex ? 'bg-white' : 'bg-white/45'
                }`}
                animate={{ width: idx === currentIndex ? 24 : 6 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* FULL-SCREEN LIGHTBOX MODAL */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 p-4 md:p-8 backdrop-blur-xl"
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <span className="font-mono text-sm font-bold bg-white/10 px-2.5 py-1 rounded-full">
                  {currentIndex + 1} / {images.length}
                </span>
                <span className="text-sm font-semibold text-white/80 truncate max-w-xs sm:max-w-md">
                  {title}
                </span>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                aria-label="Close fullscreen gallery"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Main Stage Image */}
            <div className="relative flex flex-1 items-center justify-center py-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={images[currentIndex]}
                  alt={`${title} - Photo ${currentIndex + 1}`}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.25 }}
                  className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl"
                />
              </AnimatePresence>

              {/* Prev / Next Nav in Lightbox */}
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 backdrop-blur-md active:scale-95"
                aria-label="Previous"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/25 backdrop-blur-md active:scale-95"
                aria-label="Next"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>

            {/* Bottom Thumbnail Strip */}
            <div className="no-scrollbar flex items-center justify-center gap-2 overflow-x-auto pb-2">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                    i === currentIndex
                      ? 'border-[var(--color-accent)] scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
