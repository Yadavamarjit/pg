import React from 'react'
import { Calendar } from 'lucide-react'

export const StayCard: React.FC<{ onOpenMessenger: () => void }> = ({ onOpenMessenger }) => (
  <div className="shadow-soft rounded-3xl border border-[#214956]/10 bg-white p-6">
    <Calendar className="mb-3 h-6 w-6 text-[var(--color-primary)]" aria-hidden="true" />
    <h2 className="text-lg font-bold text-[#1A202C]">Plan your visit</h2>
    <p className="mt-2 text-sm text-[#64748B]">
      Contact Sachin to arrange a visit and confirm your date and time.
    </p>
    <button
      onClick={onOpenMessenger}
      className="mt-4 min-h-[44px] rounded-xl bg-[var(--color-primary)] px-4 py-3 text-sm font-bold text-white"
    >
      Contact Sachin, Owner
    </button>
  </div>
)
