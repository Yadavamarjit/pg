import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Minus, Scale, CalendarCheck } from 'lucide-react'
import type { Room } from '@/types'

interface RoomComparisonModalProps {
  isOpen: boolean
  onClose: () => void
  rooms: Room[]
  onSelectRoom?: (roomId: string) => void
  onScheduleVisit: (roomId: string) => void
  onRemoveRoom: (roomId: string) => void
}

export const RoomComparisonModal: React.FC<RoomComparisonModalProps> = ({
  isOpen,
  onClose,
  rooms,
  onSelectRoom: _onSelectRoom,
  onScheduleVisit,
  onRemoveRoom,
}) => {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', stiffness: 350, damping: 28 }}
          className="relative z-10 flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-black/10 bg-white shadow-2xl"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-black/[0.06] p-4 sm:p-6 bg-[#FAF6F0]">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-primary)] text-white shadow-sm">
                <Scale className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#1A202C]">Side-by-Side Space Comparison</h2>
                <p className="text-xs text-[#64748B]">
                  Comparing {rooms.length} space{rooms.length > 1 ? 's' : ''} across layout, amenities, and move-in dates
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="rounded-full p-2 text-[#64748B] hover:bg-black/5 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Table Body */}
          <div className="flex-1 overflow-x-auto overflow-y-auto p-4 sm:p-6">
            {rooms.length === 0 ? (
              <div className="p-8 text-center text-xs text-[#64748B]">
                No spaces currently selected for comparison. Click the scale icon on any room card to compare!
              </div>
            ) : (
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-black/[0.06]">
                    <th className="w-36 pb-4 font-bold text-[#64748B] uppercase tracking-wider text-[11px]">
                      Feature
                    </th>
                    {rooms.map((room) => (
                      <th key={room.id} className="min-w-[200px] pb-4 px-3 align-top">
                        <div className="relative">
                          <button
                            onClick={() => onRemoveRoom(room.id)}
                            className="absolute -top-1 -right-1 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-slate-700 hover:bg-rose-500 hover:text-white transition-colors"
                            title="Remove from comparison"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          <img
                            src={room.images[0]}
                            alt={room.title}
                            className="h-28 w-full rounded-2xl object-cover shadow-sm mb-2"
                          />
                          <h4 className="font-bold text-[#1A202C] truncate">{room.title}</h4>
                          <span className="inline-block mt-1 rounded-full bg-[var(--color-primary)]/10 px-2 py-0.5 text-[10px] font-bold text-[var(--color-primary)]">
                            Price on Request
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/[0.04]">
                  <tr>
                    <td className="py-3 font-semibold text-[#1A202C]">Occupancy Layout</td>
                    {rooms.map((r) => (
                      <td key={r.id} className="py-3 px-3 font-medium text-[#1A202C]">
                        {r.typeLabel}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-[#1A202C]">Availability</td>
                    {rooms.map((r) => (
                      <td key={r.id} className="py-3 px-3 font-semibold text-emerald-700">
                        {r.availableFrom}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-[#1A202C]">Attached Washroom</td>
                    {rooms.map((r) => (
                      <td key={r.id} className="py-3 px-3">
                        {r.attachedBathroom ? (
                          <span className="flex items-center gap-1 font-semibold text-emerald-700">
                            <Check className="h-4 w-4" /> Private Attached
                          </span>
                        ) : (
                          <span className="text-[#64748B]">Shared (2 Pax)</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-[#1A202C]">Air Conditioning (AC)</td>
                    {rooms.map((r) => (
                      <td key={r.id} className="py-3 px-3">
                        {r.ac ? (
                          <span className="flex items-center gap-1 font-semibold text-emerald-700">
                            <Check className="h-4 w-4" /> 1.5 Ton Inverter AC
                          </span>
                        ) : (
                          <Minus className="h-4 w-4 text-slate-300" />
                        )}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-[#1A202C]">Fiber Wi-Fi 6</td>
                    {rooms.map((r) => (
                      <td key={r.id} className="py-3 px-3 font-semibold text-[#1A202C]">
                        300 Mbps Unlimited
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-[#1A202C]">Security Deposit</td>
                    {rooms.map((r) => (
                      <td key={r.id} className="py-3 px-3 font-semibold text-emerald-700">
                        100% Refundable
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 font-semibold text-[#1A202C]">Zero Brokerage</td>
                    {rooms.map((r) => (
                      <td key={r.id} className="py-3 px-3 font-bold text-emerald-700">
                        ✓ 0% Fee
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-4 font-semibold text-[#1A202C]">Action</td>
                    {rooms.map((r) => (
                      <td key={r.id} className="py-4 px-3">
                        <button
                          onClick={() => {
                            onClose()
                            onScheduleVisit(r.id)
                          }}
                          className="w-full flex items-center justify-center gap-1.5 rounded-xl bg-[#F35600] px-3 py-2 text-center text-xs font-bold text-white shadow-sm hover:brightness-110 active:scale-95"
                        >
                          <CalendarCheck className="h-3.5 w-3.5" />
                          <span>Schedule Visit</span>
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
