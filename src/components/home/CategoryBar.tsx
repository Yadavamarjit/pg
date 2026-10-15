import React from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  User,
  Users,
  Crown,
  Sparkles,
  Bath,
  Zap,
  Laptop,
} from 'lucide-react'

export interface CategoryItem {
  id: string
  label: string
  icon: React.ElementType
  badge?: string
}

export const CATEGORIES: CategoryItem[] = [
  { id: 'all', label: 'All Spaces', icon: Building2 },
  { id: 'single', label: 'Single Private', icon: User, badge: 'Popular' },
  { id: 'double', label: 'Twin Sharing', icon: Users },
  { id: 'studio', label: 'Studio Suites', icon: Crown, badge: 'Luxury' },
  { id: 'ac', label: 'AC Fitted', icon: Sparkles },
  { id: 'attachedBath', label: 'Attached Bath', icon: Bath },
  { id: 'immediate', label: 'Immediate Move-in', icon: Zap },
  { id: 'work', label: 'WFH Fiber Wi-Fi', icon: Laptop },
]

interface CategoryBarProps {
  activeCategory: string
  onSelectCategory: (categoryId: string) => void
  categoryCounts?: Record<string, number>
}

export const CategoryBar: React.FC<CategoryBarProps> = ({
  activeCategory,
  onSelectCategory,
  categoryCounts,
}) => {
  return (
    <div className="relative mb-6 w-full border-b border-black/[0.06] pb-3">
      <div className="no-scrollbar flex items-center gap-2 overflow-x-auto px-1 sm:gap-2.5">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon
          const isActive = activeCategory === cat.id
          const count = categoryCounts ? categoryCounts[cat.id] : undefined

          return (
            <button
              key={cat.id}
              onClick={() => {
                onSelectCategory(cat.id)
                if (typeof window !== 'undefined' && window.navigator?.vibrate) {
                  window.navigator.vibrate(10)
                }
              }}
              className={`group relative flex shrink-0 items-center gap-1.5 sm:gap-2 rounded-2xl px-3 sm:px-3.5 py-2 sm:py-2.5 text-xs font-semibold transition-all focus:outline-none ${
                isActive
                  ? 'bg-[var(--color-primary)] text-white shadow-sm'
                  : 'bg-white/85 text-[#64748B] hover:bg-white hover:text-[var(--color-primary)] border border-black/[0.04]'
              }`}
            >
              <Icon
                className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                  isActive ? 'text-white' : 'text-[#64748B] group-hover:text-[var(--color-primary)]'
                }`}
              />
              <span className="whitespace-nowrap">{cat.label}</span>

              {typeof count === 'number' && (
                <span
                  className={`text-[10px] font-bold ${
                    isActive ? 'text-white/80' : 'text-[#64748B]'
                  }`}
                >
                  ({count})
                </span>
              )}

              {cat.badge && (
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[9px] font-black uppercase ${
                    isActive
                      ? 'bg-amber-300 text-[#1A202C]'
                      : 'bg-[var(--color-accent)]/10 text-[var(--color-accent)]'
                  }`}
                >
                  {cat.badge}
                </span>
              )}

              {isActive && (
                <motion.div
                  layoutId="activeCategoryIndicator"
                  className="absolute -bottom-3 left-2 right-2 h-0.5 rounded-full bg-[var(--color-primary)]"
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                />
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
