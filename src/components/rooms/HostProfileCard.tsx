import React from 'react'
import { MessageCircle, Award, CheckCircle } from 'lucide-react'

export const HostProfileCard: React.FC = () => {
  const handleWhatsAppManager = () => {
    if (typeof window !== 'undefined' && window.navigator?.vibrate) {
      window.navigator.vibrate(12)
    }
    const text = encodeURIComponent(
      'Hi Vikram, I am interested in viewing rooms at Bhagwati Homes. Could you please help me with availability?',
    )
    window.open(`https://wa.me/917357414141?text=${text}`, '_blank')
  }

  return (
    <div className="shadow-soft rounded-3xl border border-[#214956]/10 bg-white p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-black/[0.06] pb-5">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80"
              alt="Community Manager"
              className="h-16 w-16 rounded-2xl object-cover shadow-sm ring-2 ring-[var(--color-primary)]/20"
            />
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-primary)] text-white shadow-sm">
              <Award className="h-3.5 w-3.5" style={{ color: 'var(--color-accent)' }} />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="text-base font-bold text-[#1A202C]">Vikram Malhotra</h3>
              <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-700 border border-emerald-200">
                Verified Manager
              </span>
            </div>
            <p className="text-xs text-[#64748B]">Bhagwati Homes On-Site Community Lead • 3+ Years</p>
            <div className="mt-1 flex items-center gap-2 text-[11px] text-[#64748B]">
              <span className="flex items-center gap-1 text-emerald-700 font-semibold">
                <CheckCircle className="h-3 w-3" /> Identity Verified
              </span>
              <span>•</span>
              <span>Speaks English, Hindi</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleWhatsAppManager}
          className="animate-shimmer-sheen flex items-center gap-2 rounded-xl bg-[#124000] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:brightness-110 active:scale-95"
        >
          <MessageCircle className="h-4 w-4 fill-current" />
          <span>Chat with Manager</span>
        </button>
      </div>

      {/* Host Metrics & Trust Guarantees */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="rounded-xl bg-[#FAF6F0] p-3 border border-black/[0.04]">
          <span className="block text-[11px] text-[#64748B]">Response Rate</span>
          <span className="font-mono text-sm font-black text-[#1A202C]">100%</span>
        </div>
        <div className="rounded-xl bg-[#FAF6F0] p-3 border border-black/[0.04]">
          <span className="block text-[11px] text-[#64748B]">Avg Response Time</span>
          <span className="font-mono text-sm font-black text-emerald-700">&lt; 15 mins</span>
        </div>
        <div className="rounded-xl bg-[#FAF6F0] p-3 border border-black/[0.04]">
          <span className="block text-[11px] text-[#64748B]">Security Staff</span>
          <span className="font-mono text-sm font-black text-[#1A202C]">24/7 Guarded</span>
        </div>
        <div className="rounded-xl bg-[#FAF6F0] p-3 border border-black/[0.04]">
          <span className="block text-[11px] text-[#64748B]">Deposit Return</span>
          <span className="font-mono text-sm font-black text-[var(--color-accent)]">Same-Day Guarantee</span>
        </div>
      </div>
    </div>
  )
}
