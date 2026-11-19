import React from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, Phone } from 'lucide-react'

export const WhatsAppFloat: React.FC = () => {
  const handleWhatsAppClick = () => {
    if (typeof window !== 'undefined' && window.navigator?.vibrate) {
      window.navigator.vibrate(12)
    }
    const text = encodeURIComponent(
      'Hi Bhagwati Homes, I have a question about room pricing, availability, and physical visits!',
    )
    window.open(`https://wa.me/917357414141?text=${text}`, '_blank')
  }

  return (
    <div className="fixed right-4 bottom-28 z-30 flex flex-col items-end gap-3 md:bottom-20">
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={handleWhatsAppClick}
        className="animate-shimmer-sheen shadow-soft-lg relative flex min-h-[44px] items-center gap-2 rounded-full border border-white/30 bg-[#124000] px-4 py-2.5 text-xs font-semibold text-white backdrop-blur-md transition-shadow hover:shadow-xl"
        aria-label="WhatsApp Concierge"
      >
        <div className="relative flex items-center justify-center">
          <MessageCircle className="h-4 w-4 fill-current text-white" />
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-white" />
        </div>
        <span className="hidden font-bold sm:inline">WhatsApp Help</span>
        <span className="font-bold sm:hidden">WhatsApp</span>
      </motion.button>
      <motion.a
        href="tel:+917357414141"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="shadow-soft-lg relative flex min-h-[44px] items-center gap-2 rounded-full border border-white/30 bg-[var(--color-primary)] px-4 py-2.5 text-xs font-bold text-white transition-shadow hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
        aria-label="Call Bhagwati Homes at +91 73574 14141"
      >
        <Phone className="h-4 w-4" aria-hidden="true" />
        <span>Call</span>
      </motion.a>
    </div>
  )
}
