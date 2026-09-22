import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Send, ArrowRight } from 'lucide-react'
import { searchAiConciergeApi } from '@/services/api'
import type { Room } from '@/types'

interface ConciergeSheetProps {
  isOpen: boolean
  onClose: () => void
  onSelectRoom: (roomId: string) => void
}

export const ConciergeSheet: React.FC<ConciergeSheetProps> = ({
  isOpen,
  onClose,
  onSelectRoom,
}) => {
  const [query, setQuery] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [matches, setMatches] = useState<Room[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const samplePrompts = [
    'Single room with AC and desk under 20k',
    'Double sharing room with attached bathroom',
    'Penthouse studio with high-speed Wi-Fi',
  ]

  const handleSearch = async (searchStr: string) => {
    if (!searchStr.trim()) return
    setQuery(searchStr)
    setIsProcessing(true)
    setHasSearched(true)

    const aiMatches = await searchAiConciergeApi(searchStr)
    setMatches(aiMatches)
    setIsProcessing(false)
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
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            className="fixed right-0 bottom-0 left-0 z-50 mx-auto flex max-h-[85vh] max-w-md flex-col overflow-hidden rounded-t-3xl border-t border-[#214956]/20 bg-[#FAF6F0] shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[#214956] p-5 text-white">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15">
                  <Sparkles className="h-4 w-4 text-[#F87A50]" />
                </div>
                <div>
                  <h2 className="text-base font-bold">AI Room Matcher Concierge</h2>
                  <p className="text-[11px] text-[#FAF6F0]/80">
                    Find your ideal room using natural language
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-1 text-white/80 hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-5 overflow-y-auto p-5">
              {/* Input Box */}
              <div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSearch(query)
                  }}
                  className="relative"
                >
                  <input
                    type="text"
                    placeholder="e.g., Looking for a single room with AC under 20k..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="shadow-soft w-full rounded-2xl border border-[#214956]/20 bg-white py-3.5 pr-12 pl-4 text-xs font-semibold text-[#1A202C] focus:border-[#214956] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="absolute top-2 right-2 rounded-xl bg-[#F35600] p-2 text-white transition-colors hover:bg-[#F87A50]"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>

                {/* Sample Prompt Chips */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {samplePrompts.map((p) => (
                    <button
                      key={p}
                      onClick={() => handleSearch(p)}
                      className="rounded-full border border-[#214956]/15 bg-white px-2.5 py-1 text-[11px] font-semibold text-[#214956] shadow-sm transition-all hover:bg-[#214956] hover:text-white"
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status / Loading */}
              {isProcessing && (
                <div className="shadow-soft rounded-2xl border border-[#214956]/10 bg-white p-8 text-center">
                  <Sparkles className="mx-auto mb-2 h-8 w-8 animate-spin text-[#F87A50]" />
                  <p className="text-xs font-bold text-[#214956]">
                    Matching specifications & availability...
                  </p>
                </div>
              )}

              {/* Results */}
              {!isProcessing && hasSearched && (
                <div>
                  <h3 className="mb-3 text-xs font-bold tracking-wider text-[#1A202C] uppercase">
                    Concierge AI Recommendations ({matches.length})
                  </h3>

                  <div className="space-y-3">
                    {matches.map((room) => (
                      <div
                        key={room.id}
                        onClick={() => {
                          onSelectRoom(room.id)
                          onClose()
                        }}
                        className="shadow-soft flex cursor-pointer items-center justify-between rounded-2xl border border-[#214956]/15 bg-white p-3.5 transition-all hover:border-[#214956]"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={room.images[0]}
                            alt={room.title}
                            className="h-14 w-14 rounded-xl object-cover"
                          />
                          <div>
                            <h4 className="text-xs font-bold text-[#1A202C]">{room.title}</h4>
                            <p className="mt-0.5 text-[11px] font-semibold text-[#124000]">
                              ₹{room.rent.toLocaleString('en-IN')}/mo • {room.typeLabel}
                            </p>
                          </div>
                        </div>

                        <ArrowRight className="h-4 w-4 text-[#214956]" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
