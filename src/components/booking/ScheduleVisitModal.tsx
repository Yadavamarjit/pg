import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CalendarCheck, Phone, User, MessageSquare } from 'lucide-react'
import { generateWhatsAppUrl } from '@/utils/whatsapp'
import { submitVisitApi } from '@/services/api'

interface ScheduleVisitModalProps {
  isOpen: boolean
  onClose: () => void
  roomTitle: string
  defaultDate?: string
  onSubmitSuccess: (data: { name: string; phone: string; date: string; slot: string }) => void
}

export const ScheduleVisitModal: React.FC<ScheduleVisitModalProps> = ({
  isOpen,
  onClose,
  roomTitle,
  defaultDate = '2026-09-22',
  onSubmitSuccess,
}) => {
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [visitDate, setVisitDate] = useState(defaultDate)
  const [timeSlot, setTimeSlot] = useState<string>('Morning (10 AM - 12 PM)')
  const [phoneError, setPhoneError] = useState('')

  const slots = ['Morning (10 AM - 12 PM)', 'Afternoon (2 PM - 5 PM)', 'Evening (5 PM - 8 PM)']

  const validatePhone = (num: string) => {
    const cleaned = num.replace(/\D/g, '')
    if (cleaned.length !== 10) {
      setPhoneError('Please enter a valid 10-digit Indian phone number')
      return false
    }
    setPhoneError('')
    return true
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!fullName.trim()) return
    if (!validatePhone(phone)) return

    if (window.navigator?.vibrate) {
      window.navigator.vibrate(12)
    }

    submitVisitApi({
      fullName,
      phone,
      visitDate,
      timeSlot: timeSlot as
        'Morning (10 AM - 12 PM)' | 'Afternoon (2 PM - 5 PM)' | 'Evening (5 PM - 8 PM)',
      roomTitle,
    })

    onSubmitSuccess({ name: fullName, phone, date: visitDate, slot: timeSlot })
    onClose()
  }

  const getWhatsAppLink = () => {
    return generateWhatsAppUrl('919876543210', {
      name: fullName,
      room: roomTitle,
      slot: timeSlot,
      date: visitDate,
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed inset-x-4 top-[10%] z-50 mx-auto max-w-md overflow-hidden rounded-3xl border border-[#214956]/15 bg-white p-6 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#214956]/10 pb-4">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#214956] text-white">
                  <CalendarCheck className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-[#1A202C]">Schedule Physical Visit</h2>
                  <p className="max-w-[220px] truncate text-[11px] text-[#64748B]">{roomTitle}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-[#64748B] hover:bg-[#FAF6F0]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold tracking-wider text-[#1A202C] uppercase">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute top-3 left-3 h-4 w-4 text-[#64748B]" />
                  <input
                    type="text"
                    required
                    placeholder="Enter your full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-xl border border-[#214956]/15 bg-[#FAF6F0] py-2.5 pr-3 pl-9 text-xs font-semibold text-[#1A202C] focus:border-[#214956] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold tracking-wider text-[#1A202C] uppercase">
                  10-Digit Mobile Number
                </label>
                <div className="relative">
                  <Phone className="absolute top-3 left-3 h-4 w-4 text-[#64748B]" />
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value)
                      if (phoneError) setPhoneError('')
                    }}
                    className="w-full rounded-xl border border-[#214956]/15 bg-[#FAF6F0] py-2.5 pr-3 pl-9 text-xs font-semibold text-[#1A202C] focus:border-[#214956] focus:outline-none"
                  />
                </div>
                {phoneError && (
                  <p className="mt-1 text-[11px] font-semibold text-rose-500">{phoneError}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-bold tracking-wider text-[#1A202C] uppercase">
                    Visit Date
                  </label>
                  <input
                    type="date"
                    required
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full rounded-xl border border-[#214956]/15 bg-[#FAF6F0] px-3 py-2.5 text-xs font-semibold text-[#1A202C] focus:border-[#214956] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-bold tracking-wider text-[#1A202C] uppercase">
                    Time Slot
                  </label>
                  <select
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                    className="w-full rounded-xl border border-[#214956]/15 bg-[#FAF6F0] px-2.5 py-2.5 text-xs font-semibold text-[#1A202C] focus:border-[#214956] focus:outline-none"
                  >
                    {slots.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="shadow-soft mt-2 w-full rounded-xl bg-[#214956] py-3 text-xs font-bold text-white transition-all hover:bg-[#1A3843] active:scale-[0.98]"
              >
                Request Visit Confirmation
              </button>

              <div className="border-t border-[#214956]/10 pt-3 text-center">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#124000] hover:underline"
                >
                  <MessageSquare className="h-3.5 w-3.5" /> Or confirm instantly via WhatsApp →
                </a>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
