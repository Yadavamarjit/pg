import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle, ShieldCheck, CalendarCheck, Sparkles, BedDouble } from 'lucide-react'
import type { Room } from '@/types'
import { generatePriceInquiryWhatsAppUrl } from '@/utils/whatsapp'

interface QuickQuoteModalProps {
  isOpen: boolean
  onClose: () => void
  room: Room | null
  onScheduleVisit: (roomId: string) => void
}

export const QuickQuoteModal: React.FC<QuickQuoteModalProps> = ({
  isOpen,
  onClose,
  room,
  onScheduleVisit,
}) => {
  if (!room) return null

  const handleWhatsAppQuote = () => {
    if (typeof window !== 'undefined' && window.navigator?.vibrate) {
      window.navigator.vibrate(15)
    }
    const url = generatePriceInquiryWhatsAppUrl('919876543210', {
      roomTitle: room.title,
      layout: room.typeLabel,
    })
    window.open(url, '_blank')
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Bottom Sheet Modal */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 32 }}
            className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-lg overflow-hidden rounded-t-[32px] border-t border-[var(--color-primary)]/15 bg-white p-6 shadow-2xl sm:inset-x-4 sm:bottom-6 sm:rounded-[32px] sm:border"
          >
            {/* Grab handle for mobile */}
            <div className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-slate-300 sm:hidden" />

            <div className="mb-4 flex items-center justify-between border-b border-black/[0.06] pb-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white">
                  <Sparkles className="h-4 w-4" style={{ color: 'var(--color-accent)' }} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#1A202C]">Request Instant Price Quote</h3>
                  <p className="text-[11px] text-[#64748B]">Transparent direct-owner rates & zero brokerage</p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-[#64748B] hover:bg-black/5"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Room Snapshot */}
            <div className="mb-5 flex items-center gap-3.5 rounded-2xl border border-[var(--color-primary)]/10 bg-[#FAF6F0] p-3.5">
              <img
                src={room.images[0]}
                alt={room.title}
                className="h-16 w-16 rounded-xl object-cover shadow-sm"
              />
              <div className="min-w-0 flex-1">
                <span className="inline-block rounded-md bg-[var(--color-primary)] px-2 py-0.5 text-[10px] font-bold text-white uppercase">
                  {room.typeLabel}
                </span>
                <h4 className="mt-1 truncate text-xs font-bold text-[#1A202C]">{room.title}</h4>
                <div className="mt-1 flex items-center gap-2 text-[11px] text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <BedDouble className="h-3 w-3 text-[var(--color-primary)]" />
                    {room.bedsAvailable} Beds Left
                  </span>
                  <span>•</span>
                  <span className="font-semibold text-emerald-700">Available {room.availableFrom}</span>
                </div>
              </div>
            </div>

            {/* Inclusions checklist */}
            <div className="mb-6 grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1.5 rounded-xl bg-white p-2.5 border border-black/[0.06] text-[#1A202C]">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] font-medium">100% Refundable Deposit</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl bg-white p-2.5 border border-black/[0.06] text-[#1A202C]">
                <ShieldCheck className="h-4 w-4 text-emerald-600 shrink-0" />
                <span className="text-[11px] font-medium">Zero Brokerage Fee</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleWhatsAppQuote}
                className="animate-shimmer-sheen flex w-full min-h-[48px] items-center justify-center gap-2 rounded-2xl bg-[#124000] px-4 py-3.5 text-center text-xs font-bold text-white shadow-md transition-all hover:brightness-110 active:scale-95"
              >
                <MessageCircle className="h-4 w-4 fill-current" />
                Get Instant Quote on WhatsApp (Fastest)
              </button>

              <button
                onClick={() => {
                  onClose()
                  onScheduleVisit(room.id)
                }}
                className="flex w-full min-h-[44px] items-center justify-center gap-2 rounded-2xl border border-[var(--color-primary)]/20 bg-white px-4 py-3 text-center text-xs font-bold text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)]/5 active:scale-95"
              >
                <CalendarCheck className="h-4 w-4 text-[var(--color-accent)]" />
                Schedule Physical Visit First
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
