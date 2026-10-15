import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar as CalendarIcon, CheckCircle2, Sparkles } from 'lucide-react'

interface BookingCalendarProps {
  bookedDates: string[] // YYYY-MM-DD
  monthlyRent?: number
  onSelectDate: (date: string) => void
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  bookedDates,
  monthlyRent: _monthlyRent,
  onSelectDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>('2026-09-22')
  const [burstDate, setBurstDate] = useState<string | null>(null)

  // Generate September 2026 calendar days
  const daysInMonth = Array.from({ length: 30 }, (_, i) => {
    const dayNum = i + 1
    const dayStr = dayNum < 10 ? `0${dayNum}` : `${dayNum}`
    const fullDate = `2026-09-${dayStr}`
    const isBooked = bookedDates.includes(fullDate)
    const isPast = dayNum < 18
    return { dayNum, fullDate, isBooked, isPast }
  })

  const dayHeaders = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

  const handleDateClick = (fullDate: string, isBooked: boolean, isPast: boolean) => {
    if (isBooked || isPast) return
    setSelectedDate(fullDate)
    setBurstDate(fullDate)
    setTimeout(() => setBurstDate(null), 600)
    onSelectDate(fullDate)

    if (typeof window !== 'undefined' && window.navigator?.vibrate) {
      window.navigator.vibrate(15)
    }
  }

  return (
    <div className="shadow-soft rounded-3xl border border-[#214956]/15 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#214956]/10 text-[#214956]">
            <CalendarIcon className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1A202C]">Select Visit Date</h3>
            <p className="text-[11px] text-[#64748B]">Instant confirmation with PG staff</p>
          </div>
        </div>
        <span className="font-mono text-xs font-bold text-[#214956]">Sept 2026</span>
      </div>

      {/* Legend */}
      <div className="mb-4 flex items-center justify-center gap-4 text-[11px] text-[#64748B]">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-[#214956]" />
          <span>Selected</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-[#FAF6F0] border border-[#214956]/20" />
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-slate-300" />
          <span>Booked</span>
        </div>
      </div>

      {/* Grid */}
      <div className="mb-4 grid grid-cols-7 gap-1.5 text-center">
        {dayHeaders.map((dh) => (
          <span key={dh} className="py-1 text-[11px] font-bold text-[#64748B]">
            {dh}
          </span>
        ))}

        {/* Empty offset days for Sept 1 2026 (Tuesday = 2 empty cells) */}
        <div />
        <div />

        {daysInMonth.map(({ dayNum, fullDate, isBooked, isPast }) => {
          const isSelected = selectedDate === fullDate
          const isDisabled = isBooked || isPast
          const isBursting = burstDate === fullDate

          return (
            <div key={fullDate} className="relative">
              <motion.button
                whileTap={!isDisabled ? { scale: 0.88 } : undefined}
                onClick={() => handleDateClick(fullDate, isBooked, isPast)}
                disabled={isDisabled}
                className={`relative flex h-10 w-full items-center justify-center rounded-xl text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-[#214956] font-extrabold text-white shadow-md'
                    : isBooked
                      ? 'cursor-not-allowed bg-slate-200 text-slate-400 line-through opacity-60'
                      : isPast
                        ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                        : 'border border-[#214956]/10 bg-[#EBF5F5] text-[#214956] hover:bg-[#214956]/20 active:scale-95'
                }`}
              >
                {dayNum}
                {isSelected && (
                  <motion.span
                    layoutId="calendarSelectDot"
                    className="absolute -bottom-1 h-1.5 w-1.5 rounded-full bg-[#F35600]"
                  />
                )}
              </motion.button>

              {/* Spark Pop on Selection */}
              <AnimatePresence>
                {isBursting && (
                  <motion.div
                    initial={{ scale: 0, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
                  >
                    <Sparkles className="h-6 w-6 text-amber-400" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>

      {/* Pricing Summary Card */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between rounded-xl border border-[#214956]/15 bg-[#FAF6F0] p-3.5"
        >
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#124000]" />
            <div>
              <span className="block text-xs font-bold text-[#1A202C]">Selected Visit Date</span>
              <span className="font-mono text-xs font-semibold text-[#214956]">{selectedDate}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="block text-[11px] text-[#64748B]">Pricing Plan</span>
            <span className="text-xs font-bold text-[#214956]">
              On Request
            </span>
          </div>
        </motion.div>
      )}
    </div>
  )
}
