import React from 'react'
import { commonSpaces } from '@/data/mockRooms'
import { CheckCircle2 } from 'lucide-react'

export const CommonSpacesShowcase: React.FC = () => {
  return (
    <div id="amenities-section" className="mb-10">
      <div className="mb-5 px-1">
        <h2 className="text-lg font-bold tracking-tight text-[#1A202C] md:text-xl">
          Communal Spaces & Amenities
        </h2>
        <p className="text-xs text-[#64748B] md:text-sm">
          Designed for collaboration, leisure, dining, and outdoor relaxation
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {commonSpaces.map((space) => (
          <div
            key={space.id}
            className="shadow-soft flex flex-col justify-between overflow-hidden rounded-2xl border border-[#214956]/10 bg-white"
          >
            <div>
              <div className="relative h-44">
                <img src={space.image} alt={space.title} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A202C]/80 via-transparent to-transparent" />
                <h3 className="absolute bottom-3 left-4 text-base font-bold text-white">
                  {space.title}
                </h3>
              </div>

              <div className="p-4">
                <p className="mb-4 text-xs leading-relaxed text-[#64748B]">{space.subtitle}</p>

                <div className="flex flex-wrap gap-2">
                  {space.features.map((feat) => (
                    <span
                      key={feat}
                      className="inline-flex items-center gap-1.5 rounded-full border border-[#214956]/15 bg-[#FAF6F0] px-3 py-1 text-[11px] font-semibold text-[#214956]"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#124000]" />
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
