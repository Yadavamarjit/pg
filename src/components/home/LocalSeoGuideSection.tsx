import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronDown,
  MapPin,
  Utensils,
  Zap,
  Sparkles,
  PhoneCall,
  CheckCircle2,
} from 'lucide-react'

interface FAQItem {
  q: string
  qHinglish?: string
  a: string
  category: string
}

const faqs: FAQItem[] = [
  {
    category: 'Location & Proximity',
    q: 'Where is Bhagwati Homes located and how close is it to Cyber Hub?',
    qHinglish: 'Bhagwati Homes kahan par hai aur Cyber Hub se kitni door hai?',
    a: 'Bhagwati Homes is centrally located in Sector 20 & 21, Gurugram, right near Aggarwal Sweets and within walking distance to Vishal Mega Mart / Mall. It is only 15 minutes drive from DLF Cyber Hub, Cyber City, and Udyog Vihar, making it ideal for corporate professionals and students seeking a quick daily commute.',
  },
  {
    category: 'Food & Dining',
    q: 'Are meals included? What type of food is served (Khana ke sath PG)?',
    qHinglish: 'Kya 3 time ka khana included hai aur food quality kaisi hai?',
    a: 'Yes, we provide 3-time daily chef-prepared hygienic homestyle meals (Breakfast, Lunch, and Dinner). The menu is rotated weekly, cooked with fresh ingredients in an in-house clean kitchen with filtered RO water, ensuring wholesome home-cooked nutrition.',
  },
  {
    category: 'Rent & Brokerage',
    q: 'Is there any brokerage fee or hidden charges (Bina brokerage ka PG)?',
    qHinglish: 'Kya koi brokerage ya hidden charges hain?',
    a: 'Zero Brokerage! You deal directly with the property management. There are no commission fees, no hidden maintenance surcharges, and your security deposit is 100% refundable upon completion of your notice period.',
  },
  {
    category: 'Room Types & Washrooms',
    q: 'What room sharing options are available (Single / Double / Studio)?',
    qHinglish: 'Single room aur double sharing room with attached bathroom available hai?',
    a: 'We offer fully furnished Executive Single Rooms, Double Sharing Comfort Suites, and Luxury Studio Penthouses. Every room includes attached modern washrooms with geysers, air conditioning (AC), individual study desks, and private lockable wardrobes.',
  },
  {
    category: 'Amenities & Wi-Fi',
    q: 'What amenities and power backup are provided for work-from-home?',
    qHinglish: 'Wi-Fi speed aur electricity power backup kaisa hai?',
    a: 'Every floor is equipped with 300 Mbps unlimited fiber Wi-Fi with dual-band routers, suitable for Zoom calls and remote work. We have 100% automatic generator power backup that switches on instantly during city grid cuts, plus 24/7 CCTV surveillance and biometric keyless door access.',
  },
  {
    category: 'Safety & Suitability',
    q: 'Is Bhagwati Homes safe for boys, girls, and working professionals?',
    qHinglish: 'Ladko aur ladkiyo ke liye PG kitna safe aur secure hai?',
    a: 'Yes, Bhagwati Homes maintains a secure, disciplined, and peaceful co-living environment with 24/7 on-site caretaker presence, biometric smart entry locks, CCTV monitoring across common corridors, and strict visitor verification protocols.',
  },
]

export const LocalSeoGuideSection: React.FC<{ onExploreClick: () => void }> = ({
  onExploreClick,
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      aria-label="Bhagwati Homes Local Guide, Room Plans, and FAQs"
      className="mt-12 mb-8 space-y-8"
    >
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-800 px-3 py-1 text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
          <span>Local Area &amp; Living Guide</span>
        </div>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#1A202C] tracking-tight">
          Why Bhagwati Homes is the Top Rated PG in Sector 20 &amp; 21, Gurugram
        </h2>
        <p className="mt-2 text-xs sm:text-sm text-[#64748B] leading-relaxed">
          Affordable luxury living near Aggarwal Sweets and Vishal Mall. Just 15 minutes from DLF
          Cyber Hub with hygienic 3-time meals, 300 Mbps Wi-Fi &amp; zero brokerage.
        </p>
      </div>

      {/* Structured Room Plans & Features Table (Featured Snippet Friendly) */}
      <div className="rounded-3xl border border-[#214956]/10 bg-white p-5 sm:p-7 shadow-soft overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-black/[0.06] pb-4">
          <div>
            <h3 className="text-base font-bold text-[#1A202C]">
              Room Plans &amp; Amenities Comparison • Sector 20/21 Hub
            </h3>
            <p className="text-xs text-[#64748B]">
              Transparent plans with zero brokerage and 100% refundable security deposit.
            </p>
          </div>
          <a
            href="tel:+917357414141"
            className="inline-flex items-center gap-2 rounded-xl bg-[var(--color-primary)] px-4 py-2 text-xs font-bold text-white transition-all hover:brightness-110 shrink-0"
          >
            <PhoneCall className="h-3.5 w-3.5" />
            <span>Call: +91 73574 14141</span>
          </a>
        </div>

        {/* Semantic HTML Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-[#FAF6F0] text-slate-700">
                <th className="py-3 px-3 font-bold">Room Category</th>
                <th className="py-3 px-3 font-bold">Sharing Plan</th>
                <th className="py-3 px-3 font-bold">3-Time Meals</th>
                <th className="py-3 px-3 font-bold">Wi-Fi &amp; Power Backup</th>
                <th className="py-3 px-3 font-bold">Attached Washroom</th>
                <th className="py-3 px-3 font-bold">Brokerage</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-600">
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-3 font-semibold text-[#1A202C]">Executive Single Suite</td>
                <td className="py-3 px-3">Private Single Occupancy</td>
                <td className="py-3 px-3 text-emerald-600 font-medium">Included (Chef Made)</td>
                <td className="py-3 px-3">300 Mbps + 100% Generator</td>
                <td className="py-3 px-3">Private Attached (Geyser)</td>
                <td className="py-3 px-3 font-bold text-emerald-600">₹0 (Zero Brokerage)</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-3 font-semibold text-[#1A202C]">Double Sharing Comfort</td>
                <td className="py-3 px-3">2 Persons / Twin Beds</td>
                <td className="py-3 px-3 text-emerald-600 font-medium">Included (Chef Made)</td>
                <td className="py-3 px-3">300 Mbps + 100% Generator</td>
                <td className="py-3 px-3">Shared En-suite</td>
                <td className="py-3 px-3 font-bold text-emerald-600">₹0 (Zero Brokerage)</td>
              </tr>
              <tr className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-3 font-semibold text-[#1A202C]">Studio Penthouse</td>
                <td className="py-3 px-3">Single / Couple Layout</td>
                <td className="py-3 px-3 text-emerald-600 font-medium">Included + Kitchenette</td>
                <td className="py-3 px-3">Dedicated Wi-Fi 6 Router</td>
                <td className="py-3 px-3">Luxury Glass Shower</td>
                <td className="py-3 px-3 font-bold text-emerald-600">₹0 (Zero Brokerage)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Local Landmark & Connectivity Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-[var(--color-primary)] font-bold text-sm">
            <MapPin className="h-4 w-4 text-[#F87A50]" />
            <h4>Landmarks in Walking Distance</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Situated right near <strong>Aggarwal Sweets</strong> and walking distance to{' '}
            <strong>Vishal Mega Mart / Mall</strong>, grocery stores, pharmacies, and local street
            cafes in Sector 20 &amp; 21.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-[var(--color-primary)] font-bold text-sm">
            <Zap className="h-4 w-4 text-amber-500" />
            <h4>15 Mins to DLF Cyber Hub</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Direct hassle-free commute to <strong>DLF Cyber Hub</strong>, Cyber City, Udyog Vihar
            Phases 1-5, and Millennium City Centre Metro Station with readily available cabs and
            autos.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-[var(--color-primary)] font-bold text-sm">
            <Utensils className="h-4 w-4 text-emerald-600" />
            <h4>Ghar Jaisa Khana &amp; Daily Clean</h4>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Hygienic 3 times home-style cooking prepared daily by professional cooks. Clean dining
            hall, alternate-day room dusting, and daily bathroom sanitization.
          </p>
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ Accordion with Hinglish Search Intent) */}
      <div className="rounded-3xl border border-[#214956]/10 bg-white p-5 sm:p-7 shadow-soft">
        <div className="mb-6">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Clear Answers • FAQs
          </span>
          <h3 className="text-lg sm:text-xl font-bold text-[#1A202C] mt-1">
            Frequently Asked Questions about Bhagwati Homes PG
          </h3>
          <p className="text-xs text-[#64748B]">
            Everything you need to know about pricing, food, location, and booking a visit.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200/80 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-3 p-4 text-left font-bold text-xs sm:text-sm text-[#1A202C] hover:bg-slate-50 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--color-accent)] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                      isOpen ? 'rotate-180 text-[var(--color-primary)]' : ''
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 pb-4 pt-1 text-xs leading-relaxed text-slate-600 border-t border-slate-100 bg-[#FAF6F0]/40">
                        <p>{faq.a}</p>
                        {faq.qHinglish && (
                          <p className="mt-2 text-[11px] font-medium text-slate-400 italic">
                            Search match: {faq.qHinglish}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

        {/* Quick Action Button */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <p className="text-xs text-slate-500">
            Have more questions or want to view rooms in person?
          </p>
          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/917357414141?text=Hi%20Bhagwati%20Homes%2C%20I%20am%20interested%20in%20visiting%20a%20room"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition-colors"
            >
              WhatsApp Support
            </a>
            <button
              onClick={onExploreClick}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] px-4 py-2 text-xs font-bold text-white hover:brightness-110 transition-colors"
            >
              Explore Rooms
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
