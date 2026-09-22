import React from 'react'
import type { Room } from '@/types'
import { Star, Bath, Wifi, Sparkles, Check, ChevronRight } from 'lucide-react'

interface RoomCardProps {
  room: Room
  onSelect: (roomId: string) => void
  onScheduleVisit: (roomId: string, e: React.MouseEvent) => void
}

export const RoomCard: React.FC<RoomCardProps> = ({ room, onSelect, onScheduleVisit }) => {
  return (
    <div
      onClick={() => onSelect(room.id)}
      className="shadow-soft hover:shadow-soft-lg mb-4 cursor-pointer overflow-hidden rounded-2xl border border-[#214956]/10 bg-white transition-all active:scale-[0.99]"
    >
      <div className="relative h-44">
        <img src={room.images[0]} alt={room.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="rounded-full bg-[#214956]/90 px-2.5 py-1 text-xs font-bold tracking-wider text-white uppercase backdrop-blur-md">
            {room.typeLabel}
          </span>
          {room.attachedBathroom && (
            <span className="flex items-center gap-1 rounded-full bg-[#124000]/90 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
              <Bath className="h-3 w-3" /> Attached Bath
            </span>
          )}
        </div>

        <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-[#1A202C] shadow-sm backdrop-blur-md">
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          {room.rating} <span className="text-[10px] text-[#64748B]">({room.reviewCount})</span>
        </div>

        <div className="absolute right-3 bottom-3 left-3 flex items-center justify-between text-white">
          <div>
            <div className="text-xl font-black">
              ₹{room.rent.toLocaleString('en-IN')}
              <span className="text-xs font-normal text-slate-200"> /mo</span>
            </div>
          </div>
          <span className="rounded-md border border-emerald-400/30 bg-emerald-500/20 px-2.5 py-0.5 text-xs font-semibold text-emerald-300">
            Available {room.availableFrom}
          </span>
        </div>
      </div>

      <div className="p-4">
        <h3 className="mb-1 text-base font-bold text-[#1A202C]">{room.title}</h3>
        <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-[#64748B]">
          {room.description}
        </p>

        {/* Feature Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {room.wifi && (
            <span className="inline-flex items-center gap-1 rounded-md border border-[var(--color-primary)]/10 bg-[var(--color-bg)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-primary)]">
              <Wifi className="h-3 w-3" /> 300 Mbps Wi-Fi
            </span>
          )}
          {room.ac && (
            <span className="inline-flex items-center gap-1 rounded-md border border-[var(--color-primary)]/10 bg-[var(--color-bg)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-primary)]">
              <Sparkles className="h-3 w-3" /> AC Fitted
            </span>
          )}
          {room.housekeeping && (
            <span className="inline-flex items-center gap-1 rounded-md border border-[var(--color-primary)]/10 bg-[var(--color-bg)] px-2 py-0.5 text-[11px] font-medium text-[var(--color-primary)]">
              <Check className="h-3 w-3 text-[var(--color-secondary)]" /> Daily Housekeeping
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2 border-t border-[var(--color-primary)]/10 pt-3">
          <button
            onClick={(e) => onScheduleVisit(room.id, e)}
            className="flex-1 rounded-xl border border-[var(--color-primary)]/20 bg-[var(--color-bg)] px-3 py-2 text-center text-xs font-bold text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)]/10"
          >
            Schedule Visit
          </button>
          <button
            style={{ backgroundColor: 'var(--color-primary)' }}
            className="flex items-center gap-1 rounded-xl px-4 py-2 text-xs font-bold text-white transition-all hover:brightness-110"
          >
            Details <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </div>

  )
}
