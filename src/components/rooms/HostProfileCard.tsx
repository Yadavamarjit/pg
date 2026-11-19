import React from 'react'
import { MessageCircle, Phone } from 'lucide-react'

export const HostProfileCard: React.FC = () => {
  const message = encodeURIComponent(
    'Hi Sachin, I am interested in Bhagwati Homes. Please share room availability, pricing, and visit details.',
  )
  return (
    <section
      className="shadow-soft rounded-3xl border border-[#214956]/10 bg-white p-5 sm:p-7"
      aria-label="Contact the owner"
    >
      <div className="flex items-center gap-4">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-2xl font-bold text-white"
          aria-hidden="true"
        >
          S
        </div>
        <div>
          <h3 className="text-lg font-bold text-[#1A202C]">Sachin</h3>
          <p className="text-sm font-semibold text-[var(--color-primary)]">Owner, Bhagwati Homes</p>
          <a
            href="tel:+917357414141"
            className="mt-1 inline-block text-sm text-[#64748B] hover:underline"
          >
            +91 73574 14141
          </a>
        </div>
      </div>
      <p className="mt-4 text-sm text-[#64748B]">
        Contact Sachin directly for rooms, pricing, and visits.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href="tel:+917357414141"
          aria-label="Call Sachin, owner of Bhagwati Homes"
          className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-3 text-sm font-bold text-white hover:brightness-110"
        >
          <Phone className="h-4 w-4" aria-hidden="true" /> Call Sachin
        </a>
        <a
          href={`https://wa.me/917357414141?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp Sachin (opens in a new tab)"
          className="flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl bg-[#124000] px-4 py-3 text-sm font-bold text-white hover:brightness-110"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" /> WhatsApp Sachin
        </a>
      </div>
    </section>
  )
}
