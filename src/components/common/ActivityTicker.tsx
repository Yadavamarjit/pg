import React from 'react'
import { MessageCircle, ChevronRight } from 'lucide-react'

interface ActivityTickerProps {
  onActionClick?: () => void
}

export const ActivityTicker: React.FC<ActivityTickerProps> = ({ onActionClick }) => (
  <div className="mx-auto mb-4 w-full max-w-7xl px-2 sm:px-4">
    <button
      type="button"
      onClick={onActionClick}
      className="flex min-h-[44px] w-full items-center gap-2 rounded-2xl border border-[var(--color-primary)]/10 bg-white/85 px-4 py-3 text-left text-xs text-[var(--color-primary)] shadow-sm"
    >
      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="flex-1">
        Speak with Sachin, the owner, for current availability and pricing.
      </span>
      <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
    </button>
  </div>
)
