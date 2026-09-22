import React from 'react'
import { Sparkles, Home, Search, Calendar, ShieldCheck } from 'lucide-react'
import { useTheme } from '@/context/ThemeContext'

interface HeaderProps {
  onOpenAiConcierge: () => void
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const Header: React.FC<HeaderProps> = ({ onOpenAiConcierge, activeTab, setActiveTab }) => {
  const { theme } = useTheme()
  const navLinks = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'rooms', label: 'Search Rooms', icon: Search },
    { id: 'bookings', label: 'My Bookings', icon: Calendar },
    { id: 'profile', label: 'Resident Support', icon: ShieldCheck },
  ]

  return (
    <header className="glass-header sticky top-0 z-40 flex h-[64px] items-center justify-between px-4 md:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('home')}
          className="flex shrink-0 items-center gap-2.5 text-left focus:outline-none"
        >
          {theme.logoUrl ? (
            <img
              src={theme.logoUrl}
              alt={theme.brandName}
              className="h-9 w-9 rounded-xl object-cover shadow-soft"
            />
          ) : (
            <div
              className="shadow-soft flex h-9 w-9 items-center justify-center rounded-xl font-bold text-white transition-colors"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <Home className="h-5 w-5" />
            </div>
          )}
          <div>
            <span
              className="block text-lg leading-none font-extrabold tracking-tight transition-colors"
              style={{ color: 'var(--color-primary)' }}
            >
              {theme.brandName || 'UrbanNest PG'}
            </span>
            <span className="text-[10px] font-semibold tracking-wider text-[#64748B] uppercase">
              {theme.tagline || 'Premium Co-living & PG'}
            </span>
          </div>
        </button>

        {/* Desktop Navigation Bar (hidden on mobile, visible md+) */}
        <nav className="hidden items-center gap-1 rounded-2xl border border-[var(--color-primary)]/10 bg-[var(--color-bg)]/80 p-1.5 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = activeTab === link.id
            return (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                style={isActive ? { backgroundColor: 'var(--color-primary)', color: '#ffffff' } : {}}
                className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                  isActive
                    ? 'shadow-soft'
                    : 'text-[var(--color-text-muted)] hover:bg-white/60 hover:text-[var(--color-primary)]'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Action Controls: AI Matcher Concierge + Profile Avatar */}
        <div className="flex shrink-0 items-center gap-3">
          <button
            onClick={onOpenAiConcierge}
            className="flex items-center gap-2 rounded-full border border-[var(--color-primary)]/20 bg-[var(--color-primary)]/10 px-3.5 py-2 text-xs font-bold text-[var(--color-primary)] shadow-sm transition-all hover:bg-[var(--color-primary)] hover:text-white active:scale-95"
          >
            <Sparkles className="h-4 w-4 animate-pulse text-[var(--color-accent)]" />
            <span className="hidden sm:inline">AI Match Concierge</span>
            <span className="sm:hidden">AI Match</span>
          </button>

          <div className="hidden items-center gap-2 border-l border-[var(--color-primary)]/15 pl-2 lg:flex">
            <div
              className="shadow-soft flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white ring-2 ring-[var(--color-primary)]/20"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {(theme.brandName || 'UN').substring(0, 2).toUpperCase()}
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

