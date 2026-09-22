import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar as CalendarIcon, CheckCircle2 } from 'lucide-react'

interface BookingCalendarProps {
  bookedDates: string[] // YYYY-MM-DD
  monthlyRent: number
  onSelectDate: (date: string) => void
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({
  bookedDates,
  monthlyRent,
  onSelectDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<string | null>('2026-09-22')

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
    onSelectDate(fullDate)
    if (window.navigator?.vibrate) {
      window.navigator.vibrate(12)
    }
  }

  return (
    <div className="shadow-soft mb-6 rounded-2xl border border-[#214956]/10 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-[#214956]" />
            <h3 className="text-base font-bold text-[#1A202C]">Physical Visit & Move-In Dates</h3>
          </div>
          <p className="text-xs text-[#64748B]">
            Select an open slot to schedule your walk-through
          </p>
        </div>
        <span className="rounded-lg border border-[#214956]/15 bg-[#FAF6F0] px-2.5 py-1 font-mono text-xs font-bold text-[#214956]">
          Sept 2026
        </span>
      </div>

      {/* Legend */}
      <div className="mb-4 flex items-center gap-4 text-xs text-[#64748B]">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full border border-[#214956]/30 bg-[#EBF5F5]" />
          <span>Open Slot</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full border border-slate-300 bg-slate-200" />
          <span>Booked Slot</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-3 w-3 rounded-full bg-[#214956]" />
          <span>Selected</span>
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

          return (
            <motion.button
              key={fullDate}
              whileTap={!isDisabled ? { scale: 0.9 } : undefined}
              onClick={() => handleDateClick(fullDate, isBooked, isPast)}
              disabled={isDisabled}
              className={`relative flex h-10 items-center justify-center rounded-xl text-xs font-bold transition-all ${
                isSelected
                  ? 'bg-[#214956] font-extrabold text-white shadow-md'
                  : isBooked
                    ? 'cursor-not-allowed bg-slate-200 text-slate-400 line-through opacity-60'
                    : isPast
                      ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                      : 'border border-[#214956]/10 bg-[#EBF5F5] text-[#214956] hover:bg-[#214956]/20'
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
          )
        })}
      </div>

      {/* Pricing Summary Card */}
      {selectedDate && (
        <div className="flex items-center justify-between rounded-xl border border-[#214956]/15 bg-[#FAF6F0] p-3.5">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#124000]" />
            <div>
              <span className="block text-xs font-bold text-[#1A202C]">Selected Date</span>
              <span className="font-mono text-xs font-semibold text-[#214956]">{selectedDate}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="block text-[11px] text-[#64748B]">Monthly Rent</span>
            <span className="text-sm font-extrabold text-[#214956]">
              ₹{monthlyRent.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
