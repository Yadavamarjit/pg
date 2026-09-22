import React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Sparkles, MapPin, ArrowRight } from 'lucide-react'

export const HeroSection: React.FC<{ onExploreClick: () => void }> = ({ onExploreClick }) => {
  return (
    <div
      style={{ backgroundColor: 'var(--color-primary)' }}
      className="shadow-soft-lg relative mb-8 flex min-h-[380px] flex-col justify-end overflow-hidden rounded-3xl border border-white/10 p-6 sm:min-h-[420px] sm:p-8 md:min-h-[460px] md:p-12"
    >
      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1600&q=80"
        alt="Living Space"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-45"
      />

      {/* Warm Gradient Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      {/* Content Container */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 max-w-2xl pt-4"
      >
        <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/15 px-3.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
          <ShieldCheck className="h-4 w-4" style={{ color: 'var(--color-accent)' }} />
          Verified & Biometric Access Secured
        </div>

        <h1 className="text-2xl leading-tight font-extrabold tracking-tight text-white sm:text-3xl md:text-4xl lg:text-5xl">
          Discover Your Comfortable <br className="hidden sm:inline" />
          <span style={{ color: 'var(--color-accent-light)' }}>Home Away From Home</span>
        </h1>

        <p className="mt-3 text-xs leading-relaxed font-normal text-white/90 sm:text-sm md:text-base">
          Hygienic 3-time chef meals, daily housekeeping, 300 Mbps fiber Wi-Fi, and a vibrant
          student community in Prime Bengaluru.
        </p>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3.5 py-2 text-xs font-medium text-white/90 backdrop-blur-md sm:text-sm">
            <MapPin className="h-4 w-4" style={{ color: 'var(--color-accent)' }} />
            Koramangala & Indiranagar Hubs, Bengaluru
          </div>

          <button
            onClick={onExploreClick}
            style={{ backgroundColor: 'var(--color-accent)' }}
            className="shadow-soft flex items-center gap-2 rounded-xl px-6 py-3 text-xs font-bold text-white transition-all hover:brightness-110 active:scale-95 sm:text-sm"
          >
            <Sparkles className="h-4 w-4" />
            Explore All Available Rooms <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </div>
  )
}

