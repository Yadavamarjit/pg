import React from 'react'
import type { Room } from '@/types'
import { Star, ChevronRight, BedDouble } from 'lucide-react'

interface TopRoomsReelProps {
  rooms: Room[]
  onSelectRoom: (roomId: string) => void
  onViewAll: () => void
}

export const TopRoomsReel: React.FC<TopRoomsReelProps> = ({ rooms, onSelectRoom, onViewAll }) => {
  return (
    <div className="mb-10">
      <div className="mb-4 flex items-center justify-between px-1">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-[#1A202C] md:text-xl">
            Top Available Rooms
          </h2>
          <p className="text-xs text-[#64748B] md:text-sm">
            Handpicked spaces with immediate move-in availability
          </p>
        </div>
        <button
          onClick={onViewAll}
          style={{ color: 'var(--color-primary)' }}
          className="flex items-center gap-1 text-xs font-bold transition-colors hover:opacity-80 md:text-sm"
        >
          View All Rooms <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Grid on Laptop/Desktop, Horizontal Reel on Mobile */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => onSelectRoom(room.id)}
            className="shadow-soft hover:shadow-soft-lg flex cursor-pointer flex-col justify-between overflow-hidden rounded-2xl border border-[var(--color-primary)]/10 bg-white transition-all hover:-translate-y-1 active:scale-[0.98]"
          >
            <div>
              <div className="relative h-44 sm:h-48">
                <img src={room.images[0]} alt={room.title} className="h-full w-full object-cover" />
                <div
                  style={{ backgroundColor: 'var(--color-primary)' }}
                  className="absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-bold tracking-wider text-white uppercase backdrop-blur-md"
                >
                  {room.typeLabel}
                </div>
                <div className="absolute right-3 bottom-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-xs font-bold text-[#1A202C] shadow-sm backdrop-blur-md">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  {room.rating}
                </div>
              </div>

              <div className="p-4">
                <h3 className="mb-1 truncate text-base font-bold text-[#1A202C]">{room.title}</h3>
                <div className="mb-3 flex items-center gap-3 text-xs text-[#64748B]">
                  <span className="flex items-center gap-1">
                    <BedDouble className="h-4 w-4" style={{ color: 'var(--color-primary)' }} />
                    {room.bedsAvailable} Bed
                  </span>
                  <span>•</span>
                  <span className="font-semibold" style={{ color: 'var(--color-secondary)' }}>{room.availableFrom}</span>
                </div>
              </div>
            </div>

            <div className="p-4 pt-0">
              <div className="flex items-center justify-between border-t border-[var(--color-primary)]/10 pt-3">
                <div>
                  <span className="text-lg font-black" style={{ color: 'var(--color-primary)' }}>
                    ₹{room.rent.toLocaleString('en-IN')}
                  </span>
                  <span className="text-xs text-[#64748B]"> /mo</span>
                </div>
                <span className="text-xs font-bold hover:underline" style={{ color: 'var(--color-accent)' }}>
                  View Details →
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
