import { useState, useEffect } from 'react'
import { motion, AnimatePresence, type Variants } from 'framer-motion'
import { updateSeoMetadata } from '@/utils/seo'
import { SplashScreen } from '@/components/common/SplashScreen'
import { Header } from '@/components/common/Header'
import { Footer } from '@/components/common/Footer'
import { BottomNav } from '@/components/common/BottomNav'
import { WhatsAppFloat } from '@/components/common/WhatsAppFloat'
import { ActivityTicker } from '@/components/common/ActivityTicker'
import { CategoryBar } from '@/components/home/CategoryBar'
import { HeroSection } from '@/components/home/HeroSection'
import { QuickActionsGrid } from '@/components/home/QuickActionsGrid'
import { TopRoomsReel } from '@/components/home/TopRoomsReel'
import { CommonSpacesShowcase } from '@/components/home/CommonSpacesShowcase'
import { LocalSeoGuideSection } from '@/components/home/LocalSeoGuideSection'
import { RoomCard } from '@/components/rooms/RoomCard'
import { FilterDrawer } from '@/components/rooms/FilterDrawer'
import { RoomGallery } from '@/components/rooms/RoomGallery'
import { BookingCalendar } from '@/components/rooms/BookingCalendar'
import { ReviewsSection } from '@/components/rooms/ReviewsSection'
import { HostProfileCard } from '@/components/rooms/HostProfileCard'
import { NeighborhoodMapCard } from '@/components/rooms/NeighborhoodMapCard'
import { MobileStickyBookingBar } from '@/components/rooms/MobileStickyBookingBar'
import { RoomComparisonModal } from '@/components/rooms/RoomComparisonModal'
import { ScheduleVisitModal } from '@/components/booking/ScheduleVisitModal'
import { QuickQuoteModal } from '@/components/booking/QuickQuoteModal'
import { StayCard } from '@/components/dashboard/StayCard'
import { MessengerView } from '@/components/dashboard/MessengerView'
import { ConciergeSheet } from '@/components/ai/ConciergeSheet'
import { mockRooms } from '@/data/mockRooms'
import type { FilterState, Room } from '@/types'
import {
  SlidersHorizontal,
  Star,
  Wifi,
  Shield,
  Check,
  Sparkles,
  CheckCircle,
  ArrowLeft,
  Heart,
  UserCheck,
  KeyRound,
  UtensilsCrossed,
  Scale,
} from 'lucide-react'

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
}

const gridCardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 260, damping: 24 },
  },
}

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false)
  const [isAiConciergeOpen, setIsAiConciergeOpen] = useState(false)
  const [isQuickQuoteOpen, setIsQuickQuoteOpen] = useState(false)
  const [quickQuoteRoom, setQuickQuoteRoom] = useState<Room | null>(null)
  const [isComparisonOpen, setIsComparisonOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [showSplash, setShowSplash] = useState(true)

  // Saved rooms bookmarks with localStorage persistence
  const [savedRoomIds, setSavedRoomIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bhagwati_saved_rooms')
      return saved ? JSON.parse(saved) : ['room-1', 'room-2']
    } catch {
      return ['room-1', 'room-2']
    }
  })

  // Comparison spaces state (up to 3 rooms)
  const [comparedRoomIds, setComparedRoomIds] = useState<string[]>(['room-1', 'room-2'])

  // Filter state
  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    maxBudget: 30000,
    ac: false,
    attachedBath: false,
    wifi: false,
    gym: false,
    housekeeping: false,
  })

  // Dynamic SEO title & metadata based on active workspace state
  useEffect(() => {
    if (selectedRoomId) {
      const room = mockRooms.find((r) => r.id === selectedRoomId)
      if (room) {
        updateSeoMetadata({
          title: `${room.title} - Bhagwati Homes`,
          description: room.description,
        })
      }
    } else {
      updateSeoMetadata({
        title: 'Bhagwati Homes | Premium Co-Living & Luxury PG Accommodations',
        description:
          'Discover premium single & double sharing PG rooms with modern amenities, zero brokerage, high-speed WiFi & daily housekeeping.',
      })
    }
  }, [selectedRoomId])

  // Native overscroll suppression when modal drawer is active
  useEffect(() => {
    if (
      isFilterOpen ||
      isVisitModalOpen ||
      isAiConciergeOpen ||
      isQuickQuoteOpen ||
      isComparisonOpen
    ) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isFilterOpen, isVisitModalOpen, isAiConciergeOpen, isQuickQuoteOpen, isComparisonOpen])

  const handleSelectRoom = (roomId: string) => {
    setSelectedRoomId(roomId)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleSaveRoom = (roomId: string) => {
    setSavedRoomIds((prev) => {
      const isAlreadySaved = prev.includes(roomId)
      const next = isAlreadySaved ? prev.filter((id) => id !== roomId) : [...prev, roomId]
      try {
        localStorage.setItem('bhagwati_saved_rooms', JSON.stringify(next))
      } catch {}
      triggerToast(isAlreadySaved ? 'Removed from saved spaces' : '❤️ Room saved to your shortlist!')
      return next
    })
  }

  const toggleCompareRoom = (roomId: string) => {
    setComparedRoomIds((prev) => {
      const isAlready = prev.includes(roomId)
      if (isAlready) {
        triggerToast('Removed from comparison')
        return prev.filter((id) => id !== roomId)
      } else {
        if (prev.length >= 3) {
          triggerToast('You can compare up to 3 spaces at once')
          return prev
        }
        triggerToast('Added space to comparison table')
        return [...prev, roomId]
      }
    })
  }

  const openQuickQuote = (roomId: string) => {
    const r = mockRooms.find((rm) => rm.id === roomId)
    if (r) {
      setQuickQuoteRoom(r)
      setIsQuickQuoteOpen(true)
    }
  }

  const selectedRoom = mockRooms.find((r) => r.id === selectedRoomId)
  const comparedRooms = mockRooms.filter((r) => comparedRoomIds.includes(r.id))

  const filteredRooms = mockRooms.filter((room) => {
    // 1-Tap Airbnb-Style Category Filter Matching
    if (activeCategory === 'single' && room.type !== 'single') return false
    if (activeCategory === 'double' && room.type !== 'double') return false
    if (activeCategory === 'studio' && room.type !== 'studio') return false
    if (activeCategory === 'ac' && !room.ac) return false
    if (activeCategory === 'attachedBath' && !room.attachedBathroom) return false
    if (activeCategory === 'immediate' && room.availableFrom !== 'Immediately') return false
    if (activeCategory === 'work' && !room.wifi) return false

    // Secondary Filter Drawer
    if (filters.type !== 'all' && room.type !== filters.type) return false
    if (filters.ac && !room.ac) return false
    if (filters.attachedBath && !room.attachedBathroom) return false
    if (filters.wifi && !room.wifi) return false
    if (filters.gym && !room.gym) return false
    if (filters.housekeeping && !room.housekeeping) return false
    return true
  })

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3500)
  }

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#FAF6F0] text-[#1A202C] antialiased w-full max-w-full overflow-x-hidden">
      {/* Full Page Bhagwati Homes Centered Logo Initial Animation */}
      <AnimatePresence>
        {showSplash && (
          <SplashScreen
            durationMs={2300}
            onComplete={() => setShowSplash(false)}
          />
        )}
      </AnimatePresence>

      {/* App Main Shell */}
      <div className="flex w-full max-w-full flex-1 flex-col overflow-x-hidden">
        {/* Responsive Header Navbar */}
        <Header
          onOpenAiConcierge={() => setIsAiConciergeOpen(true)}
          activeTab={activeTab}
          setActiveTab={(tab: string) => {
            setActiveTab(tab)
            setSelectedRoomId(null)
          }}
          comparedCount={comparedRoomIds.length}
          onOpenComparison={() => setIsComparisonOpen(true)}
          savedCount={savedRoomIds.length}
        />

        {/* Live Social Proof Activity Ticker */}
        <div className="pt-3">
          <ActivityTicker onActionClick={() => openQuickQuote(mockRooms[0].id)} />
        </div>

        {/* Main Workspace Container */}
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-4 md:px-8 md:py-6 overflow-x-hidden">
          <AnimatePresence mode="wait">
            {selectedRoom ? (
              <motion.div
                key={`room-detail-${selectedRoom.id}`}
                layoutId={`room-card-${selectedRoom.id}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                className="space-y-8 pb-16 md:pb-8"
              >
                {/* Back button & Action Row */}
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setSelectedRoomId(null)}
                    className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-[#214956]/15 bg-white px-5 py-2.5 text-xs font-bold text-[#214956] shadow-sm transition-all hover:bg-[#214956] hover:text-white active:scale-95"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back to Room Listings
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleCompareRoom(selectedRoom.id)}
                      className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-bold border transition-all ${
                        comparedRoomIds.includes(selectedRoom.id)
                          ? 'bg-[var(--color-primary)] text-white border-transparent'
                          : 'bg-white text-[#1A202C] border-black/10 hover:bg-slate-50'
                      }`}
                    >
                      <Scale className="h-4 w-4" />
                      <span>{comparedRoomIds.includes(selectedRoom.id) ? 'In Comparison' : 'Compare'}</span>
                    </button>

                    <button
                      onClick={() => toggleSaveRoom(selectedRoom.id)}
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-white border border-black/10 shadow-sm active:scale-90 transition-transform"
                      aria-label="Save room"
                    >
                      <Heart
                        className={`h-4 w-4 transition-colors ${
                          savedRoomIds.includes(selectedRoom.id)
                            ? 'fill-[#F35600] text-[#F35600]'
                            : 'text-[#64748B]'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                {/* 2-Column Split Screen Layout */}
                <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                  {/* Left Column: Gallery, Specs, Reviews, Host & Map */}
                  <div className="space-y-8 lg:col-span-7">
                    {/* Airbnb-style 5-Photo Mosaic / Mobile Swiper Gallery */}
                    <RoomGallery images={selectedRoom.images} title={selectedRoom.title} />

                    {/* Room Title Header Card */}
                    <div className="shadow-soft flex flex-wrap items-start justify-between gap-4 rounded-3xl border border-[#214956]/10 bg-white p-5 sm:p-7">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="rounded-md bg-[#214956] px-3 py-1 text-xs font-bold tracking-wider text-white uppercase">
                            {selectedRoom.typeLabel}
                          </span>
                          {selectedRoom.rating >= 4.9 && (
                            <span className="rounded-md bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 text-xs font-bold">
                              Guest Favorite ★
                            </span>
                          )}
                        </div>

                        <motion.h1
                          layoutId={`room-title-${selectedRoom.id}`}
                          className="text-2xl sm:text-3xl font-extrabold text-[#1A202C]"
                        >
                          {selectedRoom.title}
                        </motion.h1>
                        <div className="mt-1 flex items-center gap-2 text-xs text-[#64748B]">
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                          <span className="font-bold text-[#1A202C]">{selectedRoom.rating}</span>
                          <span>({selectedRoom.reviewCount} verified resident reviews)</span>
                          <span>•</span>
                          <span className="text-emerald-700 font-semibold">Available {selectedRoom.availableFrom}</span>
                        </div>
                      </div>

                      <div className="text-right">
                        <button
                          onClick={() => openQuickQuote(selectedRoom.id)}
                          className="animate-shimmer-sheen inline-flex items-center gap-1.5 rounded-full border border-[#214956]/20 bg-[#214956]/10 px-4 py-2 text-xs font-bold text-[#214956] transition-transform active:scale-95 hover:bg-[#214956]/15"
                        >
                          <span>Price on Request</span>
                          <Sparkles className="h-3.5 w-3.5 text-[#F35600]" />
                        </button>
                        <span className="mt-1 block text-[11px] text-[#64748B]">1-Tap instant quote via WhatsApp</span>
                      </div>
                    </div>

                    {/* Room Description */}
                    <div className="shadow-soft rounded-3xl border border-[#214956]/10 bg-white p-5 sm:p-7">
                      <h3 className="mb-2 text-xs font-bold tracking-wider text-[#1A202C] uppercase">
                        About This Space
                      </h3>
                      <p className="text-xs sm:text-sm leading-relaxed text-[#64748B]">
                        {selectedRoom.description}
                      </p>
                    </div>

                    {/* What This Place Offers (Amenities Matrix) */}
                    <div className="shadow-soft rounded-3xl border border-[#214956]/10 bg-white p-5 sm:p-7">
                      <h3 className="mb-4 text-xs font-bold tracking-wider text-[#1A202C] uppercase">
                        What This Room Offers • Included Amenities
                      </h3>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {selectedRoom.specs.map((sp) => (
                          <div
                            key={sp.title}
                            className="flex items-start gap-3 rounded-2xl border border-[#214956]/10 bg-[#FAF6F0] p-4"
                          >
                            <div className="shrink-0 rounded-xl bg-white p-2 text-[#214956] shadow-sm">
                              {sp.icon === 'Bath' && <Shield className="h-4 w-4" />}
                              {sp.icon === 'Wifi' && <Wifi className="h-4 w-4" />}
                              {sp.icon === 'Sparkles' && (
                                <Sparkles className="h-4 w-4 text-[#F35600]" />
                              )}
                              {sp.icon !== 'Bath' && sp.icon !== 'Wifi' && sp.icon !== 'Sparkles' && (
                                <Check className="h-4 w-4 text-[#124000]" />
                              )}
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-[#1A202C]">{sp.title}</h4>
                              <p className="mt-0.5 text-[11px] text-[#64748B]">{sp.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Airbnb-style Verified Reviews & Ratings Breakdown */}
                    <ReviewsSection
                      rating={selectedRoom.rating}
                      reviewCount={selectedRoom.reviewCount}
                    />

                    {/* Verified Host / Community Manager Profile Card */}
                    <HostProfileCard />

                    {/* Interactive Neighborhood Vicinity & Commute Hub */}
                    <NeighborhoodMapCard landmarks={selectedRoom.landmarks} />
                  </div>

                  {/* Right Column: Sticky Booking Sidebar (Desktop & Tablet) */}
                  <div className="space-y-6 lg:sticky lg:top-24 lg:col-span-5">
                    {/* Interactive Calendar with Spark Pop */}
                    <BookingCalendar
                      bookedDates={selectedRoom.bookedDates}
                      monthlyRent={selectedRoom.rent}
                      onSelectDate={() => {}}
                    />

                    {/* Schedule Visit Action Button Card */}
                    <div className="shadow-soft-lg flex flex-col gap-4 rounded-3xl border border-[#214956]/15 bg-white p-6">
                      <div className="flex items-center justify-between border-b border-black/[0.06] pb-4">
                        <div>
                          <span className="block text-xs text-[#64748B]">Security Deposit</span>
                          <span className="text-sm font-bold text-[#214956]">
                            100% Refundable
                          </span>
                        </div>
                        <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-700">
                          Zero Brokerage
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5">
                        <button
                          onClick={() => openQuickQuote(selectedRoom.id)}
                          className="animate-shimmer-sheen shadow-soft min-h-[48px] rounded-xl bg-[#124000] px-4 py-3 text-center text-xs font-bold text-white transition-all hover:brightness-110 active:scale-95"
                        >
                          Request Price
                        </button>
                        <button
                          onClick={() => setIsVisitModalOpen(true)}
                          className="shadow-soft min-h-[48px] rounded-xl bg-[#F35600] px-4 py-3 text-center text-xs font-bold text-white transition-all hover:bg-[#F87A50] active:scale-95"
                        >
                          Schedule Visit
                        </button>
                      </div>
                      <p className="text-center text-[11px] text-[#64748B]">
                        Free physical walk-through with key inspection
                      </p>
                    </div>
                  </div>
                </div>

                {/* Persistent Mobile Sticky Booking Bar */}
                <MobileStickyBookingBar
                  room={selectedRoom}
                  onRequestPrice={() => openQuickQuote(selectedRoom.id)}
                  onScheduleVisit={() => setIsVisitModalOpen(true)}
                />
              </motion.div>
            ) : (
              <>
                {/* Tab: HOME */}
                {activeTab === 'home' && (
                  <div className="space-y-8">
                    <HeroSection onExploreClick={() => setActiveTab('rooms')} />

                    {/* Airbnb 1-Tap Category Filter Bar */}
                    <CategoryBar
                      activeCategory={activeCategory}
                      onSelectCategory={(catId) => {
                        setActiveCategory(catId)
                        setActiveTab('rooms')
                      }}
                    />

                    <QuickActionsGrid
                      onFindRooms={() => setActiveTab('rooms')}
                      onScrollAmenities={() => {}}
                      onMeetCommunity={() => setActiveTab('support')}
                      onScheduleVisit={() => setIsVisitModalOpen(true)}
                    />

                    <TopRoomsReel
                      rooms={mockRooms}
                      onSelectRoom={handleSelectRoom}
                      onViewAll={() => setActiveTab('rooms')}
                      savedRoomIds={savedRoomIds}
                      onToggleSave={toggleSaveRoom}
                      onInquirePrice={openQuickQuote}
                      comparedRoomIds={comparedRoomIds}
                      onToggleCompare={toggleCompareRoom}
                    />

                    <CommonSpacesShowcase />
                    <LocalSeoGuideSection onExploreClick={() => setActiveTab('rooms')} />
                  </div>
                )}

                {/* Tab: ROOMS SEARCH & FILTER */}
                {activeTab === 'rooms' && (
                  <div className="space-y-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <h1 className="text-xl font-extrabold tracking-tight text-[#1A202C] md:text-2xl">
                          Explore Available PG Spaces
                        </h1>
                        <p className="text-xs text-[#64748B] md:text-sm">
                          Verified properties with transparent terms, zero brokerage, and chef-made food
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        {comparedRoomIds.length > 0 && (
                          <button
                            onClick={() => setIsComparisonOpen(true)}
                            className="inline-flex items-center gap-1.5 rounded-xl border border-[var(--color-primary)]/20 bg-white px-3.5 py-2.5 text-xs font-bold text-[var(--color-primary)] shadow-sm hover:bg-slate-50 active:scale-95"
                          >
                            <Scale className="h-4 w-4" />
                            <span>Compare ({comparedRoomIds.length})</span>
                          </button>
                        )}

                        <button
                          onClick={() => setIsFilterOpen(true)}
                          className="inline-flex items-center gap-2 rounded-xl bg-[#214956] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#1a3a45] active:scale-95"
                        >
                          <SlidersHorizontal className="h-4 w-4" /> Filter Spaces
                        </button>
                      </div>
                    </div>

                    {/* Airbnb Category Scroller */}
                    <CategoryBar
                      activeCategory={activeCategory}
                      onSelectCategory={setActiveCategory}
                    />

                    {filteredRooms.length === 0 ? (
                      <div className="rounded-3xl border border-dashed border-[#214956]/20 p-12 text-center bg-white shadow-soft">
                        <p className="text-sm font-semibold text-[#64748B]">
                          No spaces match your selected category or filters
                        </p>
                        <button
                          onClick={() => {
                            setActiveCategory('all')
                            setFilters({
                              type: 'all',
                              maxBudget: 30000,
                              ac: false,
                              attachedBath: false,
                              wifi: false,
                              gym: false,
                              housekeeping: false,
                            })
                          }}
                          className="mt-4 rounded-xl bg-[#F35600] px-5 py-2.5 text-xs font-bold text-white shadow-sm"
                        >
                          Reset Filters & View All
                        </button>
                      </div>
                    ) : (
                      <motion.div
                        variants={gridContainerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                      >
                        {filteredRooms.map((room) => (
                          <motion.div key={room.id} variants={gridCardVariants}>
                            <RoomCard
                              room={room}
                              onSelect={handleSelectRoom}
                              onScheduleVisit={(id, e) => {
                                e.stopPropagation()
                                setSelectedRoomId(id)
                                setIsVisitModalOpen(true)
                              }}
                              isSaved={savedRoomIds.includes(room.id)}
                              onToggleSave={toggleSaveRoom}
                              onInquirePrice={openQuickQuote}
                              isCompared={comparedRoomIds.includes(room.id)}
                              onToggleCompare={toggleCompareRoom}
                            />
                          </motion.div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Tab: SAVED ROOMS */}
                {activeTab === 'saved' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h1 className="text-xl font-extrabold tracking-tight text-[#1A202C] md:text-2xl flex items-center gap-2">
                          <Heart className="h-5 w-5 fill-[#F35600] text-[#F35600]" />
                          Shortlisted & Favorite Spaces ({savedRoomIds.length})
                        </h1>
                        <p className="text-xs text-[#64748B] md:text-sm">
                          Rooms you bookmarked for instant price inquiry and group visits
                        </p>
                      </div>

                      {mockRooms.filter((r) => savedRoomIds.includes(r.id)).length > 1 && (
                        <button
                          onClick={() => setIsComparisonOpen(true)}
                          className="inline-flex items-center gap-1.5 rounded-xl bg-[var(--color-primary)] px-3.5 py-2 text-xs font-bold text-white shadow-sm active:scale-95"
                        >
                          <Scale className="h-4 w-4" />
                          <span>Compare Saved Spaces</span>
                        </button>
                      )}
                    </div>

                    {mockRooms.filter((r) => savedRoomIds.includes(r.id)).length === 0 ? (
                      <div className="rounded-3xl border border-dashed border-[#214956]/20 bg-white p-12 text-center shadow-soft">
                        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FAF6F0] text-[#F35600]">
                          <Heart className="h-7 w-7" />
                        </div>
                        <h3 className="text-base font-bold text-[#1A202C]">No Shortlisted Rooms Yet</h3>
                        <p className="mx-auto mt-1 max-w-sm text-xs leading-relaxed text-[#64748B]">
                          Double-tap any room card or tap the heart icon to save and compare your favorite spaces.
                        </p>
                        <button
                          onClick={() => setActiveTab('rooms')}
                          className="mt-5 rounded-xl bg-[#214956] px-5 py-2.5 text-xs font-bold text-white shadow-md active:scale-95"
                        >
                          Explore Rooms
                        </button>
                      </div>
                    ) : (
                      <motion.div
                        variants={gridContainerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
                      >
                        {mockRooms
                          .filter((r) => savedRoomIds.includes(r.id))
                          .map((room) => (
                            <motion.div key={room.id} variants={gridCardVariants}>
                              <RoomCard
                                room={room}
                                onSelect={handleSelectRoom}
                                onScheduleVisit={(id, e) => {
                                  e.stopPropagation()
                                  setSelectedRoomId(id)
                                  setIsVisitModalOpen(true)
                                }}
                                isSaved={true}
                                onToggleSave={toggleSaveRoom}
                                onInquirePrice={openQuickQuote}
                                isCompared={comparedRoomIds.includes(room.id)}
                                onToggleCompare={toggleCompareRoom}
                              />
                            </motion.div>
                          ))}
                      </motion.div>
                    )}
                  </div>
                )}

                {/* Tab: BOOKINGS */}
                {activeTab === 'bookings' && (
                  <div className="mx-auto max-w-4xl space-y-6">
                    <div>
                      <h1 className="text-xl font-bold text-[#1A202C] md:text-2xl">
                        Your Scheduled Visits & Resident Status
                      </h1>
                      <p className="text-xs text-[#64748B] md:text-sm">
                        Track your walk-through visit appointments and upcoming move-in contracts
                      </p>
                    </div>
                    <StayCard onOpenMessenger={() => setActiveTab('support')} />
                  </div>
                )}

                {/* Tab: PROFILE / RESIDENT CLUB */}
                {activeTab === 'profile' && (
                  <div className="mx-auto max-w-3xl space-y-6">
                    <div className="shadow-soft-lg rounded-3xl border border-[var(--color-primary)]/10 bg-white p-6 sm:p-8">
                      <div className="flex items-center gap-4 border-b border-black/[0.06] pb-6">
                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[var(--color-primary)] text-white shadow-md">
                          <UserCheck className="h-8 w-8" style={{ color: 'var(--color-accent)' }} />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h2 className="text-xl font-extrabold text-[#1A202C]">Arjun Sharma</h2>
                            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                              Verified Resident
                            </span>
                          </div>
                          <p className="text-xs text-[#64748B]">Resident at Bhagwati Homes Gurugram Sec 21 • Room 302</p>
                        </div>
                      </div>

                      {/* Resident Quick Services Grid */}
                      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="rounded-2xl border border-[var(--color-primary)]/10 bg-[#FAF6F0] p-4">
                          <KeyRound className="mb-2 h-5 w-5 text-[var(--color-primary)]" />
                          <h4 className="text-xs font-bold text-[#1A202C]">Biometric Access</h4>
                          <p className="mt-0.5 text-[11px] text-[#64748B]">Active • Main Gate & 3rd Floor</p>
                        </div>
                        <div className="rounded-2xl border border-[var(--color-primary)]/10 bg-[#FAF6F0] p-4">
                          <Wifi className="mb-2 h-5 w-5 text-emerald-600" />
                          <h4 className="text-xs font-bold text-[#1A202C]">Resident Wi-Fi</h4>
                          <p className="mt-0.5 text-[11px] text-[#64748B]">300 Mbps Fiber • Connected</p>
                        </div>
                        <div className="rounded-2xl border border-[var(--color-primary)]/10 bg-[#FAF6F0] p-4">
                          <UtensilsCrossed className="mb-2 h-5 w-5 text-[var(--color-accent)]" />
                          <h4 className="text-xs font-bold text-[#1A202C]">Chef Menu Today</h4>
                          <p className="mt-0.5 text-[11px] text-[#64748B]">Paneer Butter Masala & Roti</p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <button
                          onClick={() => setActiveTab('support')}
                          className="flex-1 rounded-xl bg-[var(--color-primary)] px-4 py-3 text-center text-xs font-bold text-white transition-all active:scale-95"
                        >
                          Contact Care Desk
                        </button>
                        <button
                          onClick={() => setActiveTab('saved')}
                          className="rounded-xl border border-[var(--color-primary)]/20 px-4 py-3 text-xs font-bold text-[var(--color-primary)] hover:bg-[#FAF6F0] transition-colors"
                        >
                          View Shortlisted ({savedRoomIds.length})
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab: SUPPORT / MESSENGER */}
                {activeTab === 'support' && (
                  <div className="mx-auto max-w-5xl space-y-6">
                    <div>
                      <h1 className="text-xl font-bold text-[#1A202C] md:text-2xl">
                        Resident Support & Owner Messenger
                      </h1>
                      <p className="text-xs text-[#64748B] md:text-sm">
                        Direct real-time channel with PG Management and Housekeeping Desk
                      </p>
                    </div>
                    <MessengerView />
                  </div>
                )}
              </>
            )}
          </AnimatePresence>
        </main>

        {/* Bhagwati Homes Footer */}
        <Footer
          onNavigate={(tab: string) => {
            setActiveTab(tab)
            setSelectedRoomId(null)
          }}
          onScheduleVisit={() => setIsVisitModalOpen(true)}
        />
      </div>

      {/* Persistent Mobile Bottom Navigation Dock */}
      <BottomNav
        activeTab={activeTab}
        setActiveTab={(tab: string) => {
          setActiveTab(tab)
          setSelectedRoomId(null)
        }}
        savedCount={savedRoomIds.length}
      />

      {/* Floating WhatsApp Quick Trigger Button */}
      <WhatsAppFloat />

      {/* Slide-Up Filter Drawer (Mobile & Desktop) */}
      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onApplyFilters={setFilters}
        onResetFilters={() =>
          setFilters({
            type: 'all',
            maxBudget: 30000,
            ac: false,
            attachedBath: false,
            wifi: false,
            gym: false,
            housekeeping: false,
          })
        }
      />

      {/* Schedule Visit Modal */}
      <ScheduleVisitModal
        isOpen={isVisitModalOpen}
        onClose={() => setIsVisitModalOpen(false)}
        roomTitle={selectedRoom ? selectedRoom.title : 'Selected PG Suite'}
        onSubmitSuccess={(data) => {
          triggerToast(`Visit confirmed for ${data.name} on ${data.date} (${data.slot})!`)
        }}
      />

      {/* 1-Tap Quick Price Quote Drawer */}
      <QuickQuoteModal
        isOpen={isQuickQuoteOpen}
        onClose={() => setIsQuickQuoteOpen(false)}
        room={quickQuoteRoom}
        onScheduleVisit={(id) => {
          setSelectedRoomId(id)
          setIsVisitModalOpen(true)
        }}
      />

      {/* Side-by-Side Space Comparison Modal */}
      <RoomComparisonModal
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
        rooms={comparedRooms}
        onSelectRoom={(id) => {
          setSelectedRoomId(id)
          setIsComparisonOpen(false)
        }}
        onScheduleVisit={(id) => {
          setSelectedRoomId(id)
          setIsComparisonOpen(false)
          setIsVisitModalOpen(true)
        }}
        onRemoveRoom={toggleCompareRoom}
      />

      {/* AI Concierge Matcher Sheet */}
      <ConciergeSheet
        isOpen={isAiConciergeOpen}
        onClose={() => setIsAiConciergeOpen(false)}
        onSelectRoom={handleSelectRoom}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed right-3 left-3 sm:left-auto sm:right-4 bottom-24 z-50 flex max-w-[calc(100vw-1.5rem)] sm:max-w-sm animate-bounce items-center justify-between rounded-2xl border border-white/20 bg-[#214956] p-4 text-xs font-semibold text-white shadow-2xl md:bottom-8">
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
            <span className="truncate">{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="ml-3 p-1 text-white/80 hover:text-white shrink-0"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}
