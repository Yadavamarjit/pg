import React from 'react'
import { MessageCircle } from 'lucide-react'

export const WhatsAppFloat: React.FC = () => {
  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(
      'Hi UrbanNest PG, I have a question about room availability and physical visits!',
    )
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank')
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="shadow-soft-lg fixed right-4 bottom-20 z-30 flex items-center gap-2 rounded-full border border-white/20 bg-[#124000] px-3.5 py-2.5 text-xs font-medium text-white transition-all hover:scale-105 active:scale-95"
      aria-label="WhatsApp Concierge"
    >
      <MessageCircle className="h-4 w-4 fill-current text-white" />
      <span className="hidden font-semibold sm:inline">WhatsApp Help</span>
      <span className="font-semibold sm:hidden">Ask Us</span>
    </button>
  )
}
