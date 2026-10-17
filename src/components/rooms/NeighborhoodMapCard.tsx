import React, { useState } from 'react'
import { MapPin, Navigation, Compass, Footprints, Train, Car } from 'lucide-react'

interface NeighborhoodMapCardProps {
  landmarks: { name: string; distance: string; type: string }[]
}

const neighborhoodHighlights = [
  { name: 'Aggarwal Sweets (Landmark)', time: '2 mins', mode: 'walk', type: 'Food Hub' },
  { name: 'Vishal Mega Mart / Mall', time: '4 mins', mode: 'walk', type: 'Shopping' },
  { name: 'DLF Cyber Hub & Cyber City', time: '15 mins', mode: 'drive', type: 'Tech Park' },
  { name: 'Huda City Centre Metro Station', time: '8 mins', mode: 'drive', type: 'Transit' },
  { name: 'Ambience Mall Gurugram', time: '10 mins', mode: 'drive', type: 'Leisure' },
  { name: 'Apollo Pharmacy & Clinic', time: '3 mins', mode: 'walk', type: 'Health' },
]

export const NeighborhoodMapCard: React.FC<NeighborhoodMapCardProps> = () => {
  const [filterMode, setFilterMode] = useState<'all' | 'walk' | 'transit' | 'drive'>('all')

  const filtered = neighborhoodHighlights.filter(
    (h) => filterMode === 'all' || h.mode === filterMode,
  )

  return (
    <div className="shadow-soft rounded-3xl border border-[#214956]/10 bg-white p-5 sm:p-7">
      <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)]">
            <Compass className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#1A202C]">Where You’ll Be • Neighborhood & Commute</h3>
            <p className="text-[11px] text-[#64748B]">Sector 20 & 21, Gurugram, Haryana (Prime Corporate & Student Hub)</p>
          </div>
        </div>

        {/* Transit Mode Selector Tabs */}
        <div className="flex items-center gap-1 rounded-xl bg-[#FAF6F0] p-1 border border-black/[0.04] text-xs">
          <button
            onClick={() => setFilterMode('all')}
            className={`rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
              filterMode === 'all' ? 'bg-[var(--color-primary)] text-white' : 'text-[#64748B]'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterMode('walk')}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
              filterMode === 'walk' ? 'bg-[var(--color-primary)] text-white' : 'text-[#64748B]'
            }`}
          >
            <Footprints className="h-3 w-3" /> Walk
          </button>
          <button
            onClick={() => setFilterMode('transit')}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
              filterMode === 'transit' ? 'bg-[var(--color-primary)] text-white' : 'text-[#64748B]'
            }`}
          >
            <Train className="h-3 w-3" /> Metro
          </button>
          <button
            onClick={() => setFilterMode('drive')}
            className={`flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-bold transition-all ${
              filterMode === 'drive' ? 'bg-[var(--color-primary)] text-white' : 'text-[#64748B]'
            }`}
          >
            <Car className="h-3 w-3" /> Cab
          </button>
        </div>
      </div>

      {/* Styled Vicinity Map Visual Card */}
      <div className="relative mb-5 h-44 sm:h-52 w-full overflow-hidden rounded-2xl bg-slate-900 border border-black/[0.06]">
        <img
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&w=1200&q=80"
          alt="Neighborhood Map Area"
          className="h-full w-full object-cover opacity-65"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        {/* Map Pin Highlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <span className="absolute inline-flex h-12 w-12 animate-ping rounded-full bg-[var(--color-accent)] opacity-75" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-xl ring-4 ring-white">
              <MapPin className="h-5 w-5" />
            </div>
          </div>
          <span className="mt-1.5 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-[#1A202C] shadow-md backdrop-blur-md">
            Bhagwati Homes • Gurugram Sec 20-21
          </span>
        </div>

        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] text-white/90">
          <span className="flex items-center gap-1 font-medium">
            <Navigation className="h-3.5 w-3.5 text-emerald-400" /> Walk Score: 94/100 (Walker’s Paradise)
          </span>
          <span className="hidden sm:inline font-mono">28.4595° N, 77.0266° E</span>
        </div>
      </div>

      {/* Commute Times Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        {filtered.map((item) => (
          <div
            key={item.name}
            className="flex items-center justify-between rounded-xl bg-[#FAF6F0] p-3 text-xs border border-black/[0.03]"
          >
            <div className="flex items-center gap-2">
              {item.mode === 'walk' && <Footprints className="h-3.5 w-3.5 text-emerald-700" />}
              {item.mode === 'transit' && <Train className="h-3.5 w-3.5 text-blue-700" />}
              {item.mode === 'drive' && <Car className="h-3.5 w-3.5 text-amber-700" />}
              <div>
                <span className="font-semibold text-[#1A202C]">{item.name}</span>
                <span className="ml-1.5 text-[10px] text-[#64748B]">({item.type})</span>
              </div>
            </div>
            <span className="font-mono font-bold text-[var(--color-primary)] shrink-0">
              {item.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
