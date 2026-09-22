import React from 'react'
import { Calendar, CreditCard, Sparkles, Key } from 'lucide-react'

export const StayCard: React.FC<{ onOpenMessenger: () => void }> = ({ onOpenMessenger }) => {
  return (
    <div
      style={{ background: 'linear-gradient(135deg, var(--color-primary), #112228)' }}
      className="shadow-soft-lg relative mb-6 overflow-hidden rounded-3xl p-6 text-white"
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-extrabold tracking-wider text-white uppercase backdrop-blur-md">
          Confirmed Scheduled Visit
        </span>
        <span className="font-mono text-xs" style={{ color: 'var(--color-accent-light)' }}>
          Booking #UN-8842
        </span>
      </div>

      <h2 className="mb-1 text-xl font-bold tracking-tight">Single Deluxe Suite 302</h2>
      <p className="mb-5 text-xs text-white/80">UrbanNest Block B, Koramangala 4th Block</p>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
          <div className="mb-1 flex items-center gap-1.5 text-xs text-white/70">
            <Calendar className="h-3.5 w-3.5" style={{ color: 'var(--color-accent-light)' }} /> Visit Scheduled
          </div>
          <div className="font-mono text-sm font-bold">22 Sept 2026</div>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/10 p-3 backdrop-blur-sm">
          <div className="mb-1 flex items-center gap-1.5 text-xs text-white/70">
            <CreditCard className="h-3.5 w-3.5 text-emerald-400" /> Monthly Rent
          </div>
          <div className="font-mono text-sm font-bold">₹18,000 /mo</div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-white/15 pt-4">
        <button
          onClick={onOpenMessenger}
          style={{ color: 'var(--color-primary)' }}
          className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-white px-3 py-2.5 text-xs font-bold shadow-md transition-colors hover:bg-slate-100"
        >
          <Key className="h-3.5 w-3.5" style={{ color: 'var(--color-accent)' }} /> Chat with PG Owner
        </button>


        <button className="flex items-center gap-1 rounded-xl border border-white/20 bg-white/15 px-3 py-2.5 text-xs font-bold text-white transition-colors hover:bg-white/25">
          <Sparkles className="h-3.5 w-3.5 text-amber-300" /> Tickets
        </button>
      </div>

      <div className="pointer-events-none absolute -right-10 -bottom-10 h-32 w-32 rounded-full bg-[#F35600]/20 blur-2xl" />
    </div>
  )
}
