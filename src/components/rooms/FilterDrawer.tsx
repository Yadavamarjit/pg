import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { FilterState } from '@/types'
import { X, SlidersHorizontal, Check } from 'lucide-react'

interface FilterDrawerProps {
  isOpen: boolean
  onClose: () => void
  filters: FilterState
  onApplyFilters: (filters: FilterState) => void
  onResetFilters: () => void
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onApplyFilters,
  onResetFilters,
}) => {
  const [localFilters, setLocalFilters] = React.useState<FilterState>(filters)

  React.useEffect(() => {
    setLocalFilters(filters)
  }, [filters, isOpen])

  const roomTypes: { id: FilterState['type']; label: string }[] = [
    { id: 'all', label: 'All Layouts' },
    { id: 'single', label: 'Single Room' },
    { id: 'double', label: 'Double Sharing' },
    { id: 'studio', label: 'Studio Suite' },
  ]

  const amenities = [
    { key: 'ac', label: 'Air Conditioning (AC)' },
    { key: 'attachedBath', label: 'Attached Washroom' },
    { key: 'wifi', label: 'High Speed Wi-Fi' },
    { key: 'gym', label: 'Rooftop Gym Access' },
    { key: 'housekeeping', label: 'Daily Housekeeping' },
  ] as const

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          />

          {/* Bottom Sheet Drawer */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="fixed right-0 bottom-0 left-0 z-50 mx-auto flex max-h-[85vh] max-w-md flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl"
          >
            {/* Pull Handle */}
            <div className="mx-auto my-3 h-1.5 w-12 shrink-0 rounded-full bg-neutral-300" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#214956]/10 px-6 py-2">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4 text-[#214956]" />
                <h2 className="text-base font-bold text-[#1A202C]">Filter Room Listings</h2>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1.5 text-[#64748B] hover:bg-[#FAF6F0]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 space-y-6 overflow-y-auto p-6">
              {/* Budget Range Slider */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="text-xs font-bold tracking-wider text-[#1A202C] uppercase">
                    Max Monthly Rent
                  </label>
                  <span className="rounded-md border border-[#F35600]/20 bg-[#F35600]/10 px-2 py-0.5 font-mono text-sm font-extrabold text-[#F35600]">
                    Up to ₹{localFilters.maxBudget.toLocaleString('en-IN')}/mo
                  </span>
                </div>
                <input
                  type="range"
                  min={5000}
                  max={30000}
                  step={1000}
                  value={localFilters.maxBudget}
                  onChange={(e) =>
                    setLocalFilters({ ...localFilters, maxBudget: Number(e.target.value) })
                  }
                  className="h-2 w-full cursor-pointer rounded-lg bg-[#FAF6F0] accent-[#214956]"
                />
                <div className="mt-1 flex justify-between font-mono text-[11px] text-[#64748B]">
                  <span>₹5,000</span>
                  <span>₹17,500</span>
                  <span>₹30,000</span>
                </div>
              </div>

              {/* Segmented Room Types */}
              <div>
                <label className="mb-2.5 block text-xs font-bold tracking-wider text-[#1A202C] uppercase">
                  Occupancy Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {roomTypes.map((type) => {
                    const isSelected = localFilters.type === type.id
                    return (
                      <button
                        key={type.id}
                        onClick={() => setLocalFilters({ ...localFilters, type: type.id })}
                        className={`rounded-xl border px-3 py-2 text-xs font-bold transition-all ${
                          isSelected
                            ? 'shadow-soft border-[#214956] bg-[#214956] text-white'
                            : 'border-[#214956]/10 bg-[#FAF6F0] text-[#64748B] hover:bg-[#214956]/10'
                        }`}
                      >
                        {type.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Amenities Toggles */}
              <div>
                <label className="mb-3 block text-xs font-bold tracking-wider text-[#1A202C] uppercase">
                  Included Amenities
                </label>
                <div className="space-y-2.5">
                  {amenities.map((item) => {
                    const isChecked = localFilters[item.key]
                    return (
                      <div
                        key={item.key}
                        onClick={() => setLocalFilters({ ...localFilters, [item.key]: !isChecked })}
                        className="flex cursor-pointer items-center justify-between rounded-xl border border-[#214956]/10 bg-[#FAF6F0] p-3 transition-colors hover:bg-[#214956]/5"
                      >
                        <span className="text-xs font-semibold text-[#1A202C]">{item.label}</span>
                        <div
                          className={`flex h-5 w-5 items-center justify-center rounded-md border transition-colors ${
                            isChecked
                              ? 'border-[#124000] bg-[#124000] text-white'
                              : 'border-[#64748B]/30 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="h-3.5 w-3.5" />}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-3 border-t border-[#214956]/10 bg-white p-4">
              <button
                onClick={() => {
                  onResetFilters()
                  onClose()
                }}
                className="rounded-xl border border-[#214956]/20 px-4 py-3 text-xs font-bold text-[#214956] transition-colors hover:bg-[#FAF6F0]"
              >
                Reset All
              </button>

              <button
                onClick={() => {
                  onApplyFilters(localFilters)
                  onClose()
                }}
                className="shadow-soft flex-1 rounded-xl bg-[#F35600] px-4 py-3 text-xs font-bold text-white transition-all hover:bg-[#F87A50]"
              >
                Apply Filters & Show Rooms
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
