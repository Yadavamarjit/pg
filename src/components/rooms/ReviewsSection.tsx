import React from 'react'
import { Star, ShieldCheck, Sparkles, Award } from 'lucide-react'

interface ReviewsSectionProps {
  rating: number
  reviewCount: number
}

const mockReviews = [
  {
    id: 'rev-1',
    author: 'Priya Sundaram',
    role: 'SDE at Razorpay',
    tenure: 'Resident for 9 months',
    date: 'Sept 2026',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
    comment:
      'Moved here when joining Razorpay Koramangala. The fiber internet has never dipped below 280 Mbps which made on-call shifts super reliable. 3-time hot meals are hygienic, and biometric entry gives complete peace of mind.',
  },
  {
    id: 'rev-2',
    author: 'Karthik Varma',
    role: 'Christ University Student',
    tenure: 'Resident for 1.2 years',
    date: 'Aug 2026',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
    comment:
      'Best decision to choose Bhagwati over ordinary PGs. Housekeeping cleans the room and attached bath every single morning. The zero-brokerage deposit was returned on the exact move-out date for my senior roommate.',
  },
  {
    id: 'rev-3',
    author: 'Ananya Deshmukh',
    role: 'Product Designer at CRED',
    tenure: 'Resident for 6 months',
    date: 'July 2026',
    rating: 4.9,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
    comment:
      'Quiet acoustic ambiance, ergonomic desk, and lovely rooftop lounge where you can actually work without noise. The caretakers are responsive on the resident chat within 5 minutes.',
  },
]

const categoryRatings = [
  { label: 'Cleanliness & Hygiene', score: '4.9', percent: 98 },
  { label: '3-Time Chef Meals', score: '4.85', percent: 97 },
  { label: 'Wi-Fi 6 Speed & Uptime', score: '5.0', percent: 100 },
  { label: 'Safety & Biometrics', score: '5.0', percent: 100 },
  { label: 'Staff & Care Desk', score: '4.9', percent: 98 },
]

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  rating,
  reviewCount,
}) => {
  return (
    <div className="shadow-soft rounded-3xl border border-[#214956]/10 bg-white p-5 sm:p-7">
      {/* Airbnb 'Guest Favorite' Header Card */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl border border-amber-400/20 bg-gradient-to-r from-amber-500/10 via-[#FAF6F0] to-transparent p-4 sm:p-5">
        <div className="flex items-center gap-3.5">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-400 text-amber-950 shadow-md">
            <Award className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-black text-[#1A202C]">Guest Favorite</span>
              <Sparkles className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
            </div>
            <p className="text-xs text-[#64748B]">
              One of the most loved spaces on Bhagwati Homes based on ratings and verified resident feedback
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <div className="text-right">
            <div className="flex items-center gap-1 text-2xl font-black text-[#1A202C]">
              <span>{rating}</span>
              <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            </div>
            <span className="text-[11px] font-semibold text-[#64748B]">
              {reviewCount} Verified Reviews
            </span>
          </div>
        </div>
      </div>

      {/* Category Breakdown Progress Bars */}
      <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3.5 border-b border-black/[0.06] pb-6">
        {categoryRatings.map((cat) => (
          <div key={cat.label} className="flex items-center justify-between text-xs">
            <span className="text-[#1A202C] font-medium">{cat.label}</span>
            <div className="flex items-center gap-2.5">
              <div className="h-1.5 w-24 sm:w-28 rounded-full bg-slate-100 overflow-hidden">
                <div
                  className="h-full rounded-full bg-[var(--color-primary)] transition-all duration-700"
                  style={{ width: `${cat.percent}%` }}
                />
              </div>
              <span className="font-mono text-xs font-bold text-[#1A202C] w-7 text-right">
                {cat.score}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Resident Review Cards Grid */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold tracking-wider text-[#1A202C] uppercase">
          Resident Testimonials ({mockReviews.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {mockReviews.map((rev) => (
            <div
              key={rev.id}
              className="flex flex-col justify-between rounded-2xl border border-black/[0.05] bg-[#FAF6F0] p-4 text-xs"
            >
              <div>
                {/* Author Info */}
                <div className="mb-3 flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="h-10 w-10 rounded-full object-cover shadow-sm ring-2 ring-white"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="font-bold text-[#1A202C]">{rev.author}</h4>
                      <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <p className="text-[10px] text-[#64748B]">{rev.role}</p>
                  </div>
                </div>

                {/* Rating Stars + Date */}
                <div className="mb-2 flex items-center gap-1.5">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-current" />
                    ))}
                  </div>
                  <span className="text-[10px] font-semibold text-[#64748B]">• {rev.date}</span>
                </div>

                <p className="leading-relaxed text-[#4A5568] line-clamp-4">
                  "{rev.comment}"
                </p>
              </div>

              <div className="mt-3 border-t border-black/[0.05] pt-2 text-[10px] font-semibold text-emerald-700">
                ✓ {rev.tenure}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
