import React from 'react'
import { Sparkles, Home, Search, Calendar, ShieldCheck, Scale, Heart } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

interface HeaderProps {
  onOpenAiConcierge: () => void
  activeTab: string
  setActiveTab: (tab: string) => void
  comparedCount?: number
  onOpenComparison?: () => void
  savedCount?: number
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAiConcierge,
  activeTab,
  setActiveTab,
  comparedCount = 0,
  onOpenComparison,
  savedCount = 0,
}) => {
  const { theme } = useTheme()
  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'rooms', label: 'Explore Spaces', icon: Search },
    { id: 'saved', label: 'Saved', icon: Heart, count: savedCount },
    { id: 'bookings', label: 'Visits', icon: Calendar },
    { id: 'profile', label: 'Resident Club', icon: ShieldCheck },
  ]

  return (
    <header className="glass-header sticky top-0 z-40 flex h-[64px] sm:h-[68px] items-center justify-between px-3 md:px-8 w-full max-w-full overflow-hidden">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 sm:gap-4">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex min-w-0 shrink items-center gap-2 text-left focus:outline-none group"
        >
          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-1 shadow-soft border border-[#214956]/15 transition-transform group-hover:scale-105">
            <img
              src={theme.logoUrl || '/assets/logo.png'}
              alt={theme.brandName || 'Bhagwati Homes'}
              style={{ filter: 'invert(1)', mixBlendMode: 'multiply' }}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="min-w-0">
            <span
              className="block text-sm sm:text-base md:text-lg leading-tight font-extrabold tracking-tight transition-colors truncate"
              style={{ color: 'var(--color-primary)' }}
            >
              {theme.brandName || 'Bhagwati Homes'}
            </span>
            <span className="hidden sm:block text-[9px] sm:text-[10px] font-semibold tracking-wider text-[#64748B] uppercase truncate">
              {theme.tagline || 'Premium Co-living & Luxury PG'}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 rounded-2xl border border-[var(--color-primary)]/10 bg-[var(--color-bg)]/80 p-1 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = activeTab === link.id
            const hasCount = typeof link.count === 'number' && link.count > 0

            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                style={isActive ? { backgroundColor: 'var(--color-primary)', color: '#ffffff' } : {}}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-bold transition-all relative ${
                  isActive
                    ? 'shadow-soft'
                    : 'text-[var(--color-text-muted)] hover:bg-white/60 hover:text-[var(--color-primary)]'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
                {hasCount && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[9px] font-black ${
                      isActive ? 'bg-amber-300 text-[#1A202C]' : 'bg-[var(--color-accent)] text-white'
                    }`}
                  >
                    {link.count}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Action Controls: Comparison + AI Concierge + Profile Avatar */}
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
          {/* Compare Button */}
          {comparedCount > 0 && onOpenComparison && (
            <button
              onClick={onOpenComparison}
              className="animate-shimmer-sheen flex items-center gap-1 sm:gap-1.5 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)] px-2.5 sm:px-3 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-white shadow-sm transition-all hover:brightness-110 active:scale-95"
              title="Compare selected rooms"
            >
              <Scale className="h-3.5 w-3.5 shrink-0" />
              <span className="hidden xs:inline">Compare</span>
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-black text-black shrink-0">
                {comparedCount}
              </span>
            </button>
          )}

          {/* AI Matcher Concierge Trigger */}
          <button
            onClick={onOpenAiConcierge}
            className="flex items-center gap-1.5 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-bold text-[var(--color-primary)] shadow-sm transition-all hover:bg-[var(--color-primary)] hover:text-white active:scale-95 shrink-0"
          >
            <Sparkles className="h-3.5 w-3.5 animate-pulse text-[var(--color-accent)] shrink-0" />
            <span className="hidden sm:inline">AI Match Concierge</span>
            <span className="sm:hidden font-semibold">AI Match</span>
          </button>

          {/* Verified Resident Portal Avatar */}
          <div
            onClick={() => setActiveTab('profile')}
            className="hidden items-center gap-2 border-l border-[var(--color-primary)]/15 pl-2 lg:flex cursor-pointer hover:opacity-85"
          >
            <div
              className="shadow-soft flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ring-2 ring-[var(--color-primary)]/20"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {(theme.brandName || 'BH').substring(0, 2).toUpperCase()}
            </div>
            <div className="text-left text-xs">
              <span className="block leading-none font-bold text-[var(--color-text-primary)]">Resident Portal</span>
              <span className="text-[10px] font-semibold text-[var(--color-secondary)]">Verified Member</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
