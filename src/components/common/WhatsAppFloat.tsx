import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export const WhatsAppFloat: React.FC = () => {
  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && window.navigator?.vibrate) {
      window.navigator.vibrate(12)
    }
    const text = encodeURIComponent(
      'Hi Bhagwati Homes, I have a question about room pricing, availability, and physical visits!',
    )
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank')
  }

  return (
    <div className="fixed right-4 bottom-20 z-30 flex items-center">
      {/* Radar Wave Pulse */}
      <span className="pointer-events-none absolute -inset-1 animate-ping rounded-full bg-emerald-500/25 opacity-75" />

      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleWhatsAppClick}
        className="animate-shimmer-sheen shadow-soft-lg relative flex items-center gap-2 rounded-full border border-white/30 bg-[#124000] px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md transition-shadow hover:shadow-xl"
        aria-label="WhatsApp Concierge"
      >
        <div className="relative flex items-center justify-center">
          <MessageCircle className="h-4 w-4 fill-current text-white" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-white" />
        </div>
        <span className="hidden font-bold sm:inline">WhatsApp Help</span>
        <span className="font-bold sm:hidden">Ask Us</span>
      </motion.button>
    </div>
  )
}
