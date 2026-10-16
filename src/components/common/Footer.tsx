import React from 'react'
import { Phone, Mail, MapPin, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react'

interface FooterProps {
  onNavigate: (tab: string) => void
  onScheduleVisit: () => void
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onScheduleVisit }) => {
  return (
    <footer className="mt-16 border-t border-[#214956]/15 bg-[#1A3038] text-white">
      {/* Top CTA Banner */}
      <div className="border-b border-white/10 bg-[#214956] py-8 px-4 md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F35600]/20 px-3 py-1 text-xs font-bold text-[#F87A50]">
              <Sparkles className="h-3.5 w-3.5" /> Instant Walk-Through
            </span>
            <h3 className="mt-2 text-xl font-extrabold text-white md:text-2xl">
              Ready to experience Bhagwati Homes?
            </h3>
            <p className="text-xs text-white/70 md:text-sm">
              Schedule a zero-brokerage physical visit and move in with 100% peace of mind.
            </p>
          </div>
          <button
            onClick={onScheduleVisit}
            className="flex min-h-[48px] items-center gap-2 rounded-xl bg-[#F35600] px-6 py-3 text-sm font-bold text-white shadow-lg transition-all hover:bg-[#F87A50] active:scale-95"
          >
            Schedule Physical Visit <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/assets/logo.png"
                alt="Bhagwati Homes"
                className="h-10 w-10 rounded-xl object-contain bg-white p-1 shadow-md"
              />
              <div>
                <span className="block text-xl font-extrabold tracking-tight text-white">
                  Bhagwati Homes
                </span>
                <span className="text-[10px] font-semibold tracking-wider text-amber-400 uppercase">
                  Premium Co-Living & PG
                </span>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-300">
              Bhagwati Homes provides luxury single, double, and studio PG rooms with hygienic 3-time chef meals, 300 Mbps Wi-Fi, daily housekeeping, biometric security, and zero brokerage in Sector 20 & 21, Gurugram, Haryana.
            </p>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400">
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Verified Property • Zero Brokerage</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-xs font-bold tracking-wider text-amber-400 uppercase">
              Quick Navigation
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="transition-colors hover:text-white"
                >
                  Home & Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('rooms')}
                  className="transition-colors hover:text-white"
                >
                  Explore Rooms & Suites
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('bookings')}
                  className="transition-colors hover:text-white"
                >
                  Scheduled Visits & Status
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('support')}
                  className="transition-colors hover:text-white"
                >
                  Resident Support & Messenger
                </button>
              </li>
            </ul>
          </div>

          {/* Room Categories */}
          <div>
            <h4 className="mb-4 text-xs font-bold tracking-wider text-amber-400 uppercase">
              Room Categories
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>Single Deluxe Suites (Balcony & Workstation)</li>
              <li>Double Sharing Comfort (Twin Beds & Desks)</li>
              <li>Premium Studio Penthouse (Kitchenette & Smart TV)</li>
              <li>Executive Budget Single Rooms</li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3 text-xs text-slate-300">
            <h4 className="mb-4 text-xs font-bold tracking-wider text-amber-400 uppercase">
              Get in Touch
            </h4>
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 text-[#F87A50] shrink-0 mt-0.5" />
              <span>Sector 20 & 21, Gurugram, Haryana 122016</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 text-[#F87A50] shrink-0" />
              <span>+91 98765 43210 / WhatsApp Support</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 text-[#F87A50] shrink-0" />
              <span>contact@bhagwatihomes.com</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 md:flex-row">
          <p>© 2026 Bhagwati Homes. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="h-3.5 w-3.5 text-rose-500 fill-rose-500" />
            <span>for comfortable living</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
