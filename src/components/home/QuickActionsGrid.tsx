import React from 'react'
import { Search, Utensils, Users, CalendarCheck } from 'lucide-react'

interface QuickActionsGridProps {
  onFindRooms: () => void
  onScrollAmenities: () => void
  onMeetCommunity: () => void
  onScheduleVisit: () => void
}

export const QuickActionsGrid: React.FC<QuickActionsGridProps> = ({
  onFindRooms,
  onScrollAmenities,
  onMeetCommunity,
  onScheduleVisit,
}) => {
  const actions = [
    { label: 'Find Rooms', icon: Search, color: 'bg-[#214956] text-white', onClick: onFindRooms },
    {
      label: 'Amenities',
      icon: Utensils,
      color: 'bg-[#124000] text-white',
      onClick: onScrollAmenities,
    },
    { label: 'Community', icon: Users, color: 'bg-amber-700 text-white', onClick: onMeetCommunity },
    {
      label: 'Schedule Visit',
      icon: CalendarCheck,
      color: 'bg-[#F35600] text-white',
      onClick: onScheduleVisit,
    },
  ]

  return (
    <div className="mb-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
      {actions.map((act) => {
        const Icon = act.icon
        return (
          <button
            key={act.label}
            onClick={act.onClick}
            className={`shadow-soft flex flex-col items-center justify-center rounded-2xl p-3 text-center transition-all active:scale-95 ${act.color}`}
          >
            <Icon className="mb-1.5 h-5 w-5 opacity-90" />
            <span className="text-xs font-semibold tracking-tight">{act.label}</span>
          </button>
        )
      })}
    </div>
  )
}
