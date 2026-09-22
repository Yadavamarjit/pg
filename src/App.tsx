import { useState, useEffect } from 'react'
import { updateSeoMetadata } from '@/utils/seo'
import { Header } from '@/components/common/Header'
import { BottomNav } from '@/components/common/BottomNav'
import { WhatsAppFloat } from '@/components/common/WhatsAppFloat'
import { HeroSection } from '@/components/home/HeroSection'
import { QuickActionsGrid } from '@/components/home/QuickActionsGrid'
import { TopRoomsReel } from '@/components/home/TopRoomsReel'
import { CommonSpacesShowcase } from '@/components/home/CommonSpacesShowcase'
import { RoomCard } from '@/components/rooms/RoomCard'
import { FilterDrawer } from '@/components/rooms/FilterDrawer'
import { RoomGallery } from '@/components/rooms/RoomGallery'
import { BookingCalendar } from '@/components/rooms/BookingCalendar'
import { RentEstimatorCard } from '@/components/rooms/RentEstimatorCard'
import { ScheduleVisitModal } from '@/components/booking/ScheduleVisitModal'
import { StayCard } from '@/components/dashboard/StayCard'
import { MessengerView } from '@/components/dashboard/MessengerView'
import { ConciergeSheet } from '@/components/ai/ConciergeSheet'
import { mockRooms } from '@/data/mockRooms'
import type { FilterState } from '@/types'
import {
  SlidersHorizontal,
  ArrowLeft,
  Star,
  Wifi,
  Shield,
  Check,
  MapPin,
  Sparkles,
  CheckCircle,
} from 'lucide-react'

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home')
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null)
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isVisitModalOpen, setIsVisitModalOpen] = useState(false)
  const [isAiConciergeOpen, setIsAiConciergeOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const [filters, setFilters] = useState<FilterState>({
    type: 'all',
    maxBudget: 30000,
    ac: false,
    attachedBath: false,
    wifi: false,
    gym: false,
    housekeeping: false,
  })

  // Dynamic SEO Metadata Updates
  useEffect(() => {
    if (selectedRoomId) {
      const room = mockRooms.find((r) => r.id === selectedRoomId)
      if (room) {
        updateSeoMetadata({
          title: `${room.title} — ₹${room.rent.toLocaleString('en-IN')}/mo | UrbanNest PG`,
          description: `${room.title}: ${room.description}`,
          ogImage: room.images[0],
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Accommodation',
            name: room.title,
            description: room.description,
            offers: {
              '@type': 'Offer',
              price: room.rent,
              priceCurrency: 'INR',
            },
          },
        })
        return
      }
    }

    if (activeTab === 'rooms') {
      updateSeoMetadata({
        title: 'Available PG Rooms in Koramangala & Indiranagar | UrbanNest PG',
        description:
          'Browse single, double sharing, and penthouse studio PG rooms with 3-time meals & 300 Mbps Wi-Fi.',
      })
    } else if (activeTab === 'bookings') {
      updateSeoMetadata({
        title: 'My Bookings & Physical Visits | UrbanNest PG',
        description: 'Track your scheduled walk-through visit appointments and resident contracts.',
      })
    } else if (activeTab === 'profile') {
      updateSeoMetadata({
        title: 'Resident Support & Owner Messenger | UrbanNest PG',
        description: 'Direct communication channel with UrbanNest PG Owner and Housekeeping Desk.',
      })
    } else {
      updateSeoMetadata({
        title: 'UrbanNest PG — Premium Co-living & PG Accommodation in Bengaluru',
        description:
          'Hygienic 3-time chef meals, daily housekeeping, 300 Mbps Wi-Fi, biometric security, and zero brokerage in Koramangala & Indiranagar.',
      })
    }
  }, [activeTab, selectedRoomId])

  // Filtered rooms logic
  const filteredRooms = mockRooms.filter((room) => {
    if (filters.type !== 'all' && room.type !== filters.type) return false
    if (room.rent > filters.maxBudget) return false
    if (filters.ac && !room.ac) return false
    if (filters.attachedBath && !room.attachedBathroom) return false
    if (filters.wifi && !room.wifi) return false
    if (filters.gym && !room.gym) return false
    if (filters.housekeeping && !room.housekeeping) return false
    return true
  })

  const selectedRoom = mockRooms.find((r) => r.id === selectedRoomId) || mockRooms[0]

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 4500)
  }

  const handleSelectRoom = (id: string) => {
    setSelectedRoomId(id)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleScrollAmenities = () => {
    setActiveTab('home')
    setTimeout(() => {
      document.getElementById('amenities-section')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="flex min-h-screen flex-col justify-between bg-[#FAF6F0] text-[#1A202C] antialiased">
      {/* App Main Shell */}
      <div className="flex w-full flex-1 flex-col">
        {/* Responsive Header Navbar */}
        <Header
          onOpenAiConcierge={() => setIsAiConciergeOpen(true)}
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab)
            setSelectedRoomId(null)
          }}
        />

        {/* Main Workspace Container */}
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-8 md:py-8">
          {/* Room Detail View Mode */}
          {selectedRoomId ? (
            <div>
              {/* Back button */}
              <button
                onClick={() => setSelectedRoomId(null)}
                className="mb-6 inline-flex items-center gap-2 rounded-xl border border-[#214956]/15 bg-white px-4 py-2 text-xs font-bold text-[#214956] shadow-sm transition-all hover:text-[#F35600]"
              >
                <ArrowLeft className="h-4 w-4" /> Back to Room Listings
              </button>

              {/* Desktop 2-Column Split Screen Layout */}
              <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-12">
                {/* Left Column: Gallery, Specs & Rent Calculator */}
                <div className="space-y-6 lg:col-span-7">
                  <RoomGallery images={selectedRoom.images} title={selectedRoom.title} />

                  {/* Room Title Header */}
                  <div className="shadow-soft flex flex-wrap items-start justify-between gap-4 rounded-3xl border border-[#214956]/10 bg-white p-5">
                    <div>
                      <span className="mb-2 inline-block rounded-md bg-[#214956] px-3 py-1 text-xs font-bold tracking-wider text-white uppercase">
                        {selectedRoom.typeLabel}
                      </span>
                      <h1 className="text-2xl font-extrabold text-[#1A202C]">
                        {selectedRoom.title}
                      </h1>
                      <div className="mt-1 flex items-center gap-2 text-xs text-[#64748B]">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="font-bold text-[#1A202C]">{selectedRoom.rating}</span>
                        <span>({selectedRoom.reviewCount} verified reviews)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-black text-[#214956]">
                        ₹{selectedRoom.rent.toLocaleString('en-IN')}
                      </span>
                      <span className="block text-xs text-[#64748B]">/ month</span>
                    </div>
                  </div>

                  {/* Room Description */}
                  <div className="shadow-soft rounded-3xl border border-[#214956]/10 bg-white p-5">
                    <h3 className="mb-2 text-xs font-bold tracking-wider text-[#1A202C] uppercase">
                      About Room
                    </h3>
                    <p className="text-xs leading-relaxed text-[#64748B] md:text-sm">
                      {selectedRoom.description}
                    </p>
                  </div>

                  {/* Specs Matrix */}
                  <div className="shadow-soft rounded-3xl border border-[#214956]/10 bg-white p-5">
                    <h3 className="mb-4 text-xs font-bold tracking-wider text-[#1A202C] uppercase">
                      Included Room Features & Services
                    </h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {selectedRoom.specs.map((sp) => (
                        <div
                          key={sp.title}
                          className="flex items-start gap-3 rounded-2xl border border-[#214956]/10 bg-[#FAF6F0] p-3.5"
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

                  {/* Smart Rent Estimator Calculator */}
                  <RentEstimatorCard baseRent={selectedRoom.rent} />
                </div>

                {/* Right Column: Sticky Booking Sidebar */}
                <div className="space-y-6 lg:sticky lg:top-24 lg:col-span-5">
                  {/* Interactive Calendar */}
                  <BookingCalendar
                    bookedDates={selectedRoom.bookedDates}
                    monthlyRent={selectedRoom.rent}
                    onSelectDate={() => {}}
                  />

                  {/* Neighborhood Landmarks */}
                  <div className="shadow-soft rounded-3xl border border-[#214956]/10 bg-white p-5">
                    <h3 className="mb-4 flex items-center gap-2 text-xs font-bold tracking-wider text-[#1A202C] uppercase">
                      <MapPin className="h-4 w-4 text-[#F35600]" /> Nearby Landmarks & Transit Times
                    </h3>
                    <div className="space-y-3">
                      {selectedRoom.landmarks.map((lm) => (
                        <div
                          key={lm.name}
                          className="flex items-center justify-between rounded-xl bg-[#FAF6F0] p-3 text-xs"
                        >
                          <span className="font-semibold text-[#1A202C]">{lm.name}</span>
                          <span className="font-mono font-bold text-[#214956]">{lm.distance}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Schedule Visit Action Button Card */}
                  <div className="shadow-soft-lg flex flex-col gap-4 rounded-3xl border border-[#214956]/15 bg-white p-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="block text-xs text-[#64748B]">Security Deposit</span>
                        <span className="text-sm font-bold text-[#214956]">
                          ₹{selectedRoom.deposit.toLocaleString('en-IN')} (100% Refundable)
                        </span>
                      </div>
                      <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-700">
                        Zero Brokerage
                      </span>
                    </div>

                    <button
                      onClick={() => setIsVisitModalOpen(true)}
                      className="shadow-soft w-full rounded-xl bg-[#F35600] px-6 py-3.5 text-center text-sm font-bold text-white transition-all hover:bg-[#F87A50] active:scale-95"
                    >
                      Schedule Physical Walk-Through Visit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Tab: HOME */}
              {activeTab === 'home' && (
                <div className="space-y-8">
                  <HeroSection onExploreClick={() => setActiveTab('rooms')} />
                  <QuickActionsGrid
                    onFindRooms={() => setActiveTab('rooms')}
                    onScrollAmenities={handleScrollAmenities}
                    onMeetCommunity={() => setActiveTab('profile')}
                    onScheduleVisit={() => setIsVisitModalOpen(true)}
                  />
                  <TopRoomsReel
                    rooms={mockRooms}
                    onSelectRoom={handleSelectRoom}
                    onViewAll={() => setActiveTab('rooms')}
                  />
                  <CommonSpacesShowcase />
                </div>
              )}

              {/* Tab: ROOMS / SEARCH */}
              {activeTab === 'rooms' && (
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h1 className="text-xl font-bold text-[#1A202C] md:text-2xl">
                        Available PG Rooms & Suites
                      </h1>
                      <p className="text-xs text-[#64748B] md:text-sm">
                        Showing {filteredRooms.length} verified occupancy spaces in Koramangala
                      </p>
                    </div>

                    <button
                      onClick={() => setIsFilterOpen(true)}
                      className="shadow-soft flex items-center gap-2 rounded-xl bg-[#214956] px-4 py-2.5 text-xs font-bold text-white transition-all hover:bg-[#1A3843]"
                    >
                      <SlidersHorizontal className="h-4 w-4" /> Filter Options
                    </button>
                  </div>

                  {filteredRooms.length === 0 ? (
                    <div className="shadow-soft rounded-3xl border border-[#214956]/10 bg-white p-12 text-center">
                      <p className="text-base font-bold text-[#214956]">
                        No rooms match your filter criteria
                      </p>
                      <button
                        onClick={() =>
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
                        className="mt-4 rounded-xl bg-[#F35600] px-5 py-2.5 text-xs font-bold text-white"
                      >
                        Reset All Filters
                      </button>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {filteredRooms.map((room) => (
                        <RoomCard
                          key={room.id}
                          room={room}
                          onSelect={handleSelectRoom}
                          onScheduleVisit={(id, e) => {
                            e.stopPropagation()
                            setSelectedRoomId(id)
                            setIsVisitModalOpen(true)
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Tab: BOOKINGS */}
              {activeTab === 'bookings' && (
                <div className="mx-auto max-w-4xl">
                  <h1 className="mb-1 text-xl font-bold text-[#1A202C] md:text-2xl">
                    Your Scheduled Visits & Resident Status
                  </h1>
                  <p className="mb-6 text-xs text-[#64748B] md:text-sm">
                    Track your walk-through visit appointments and upcoming move-in contracts
                  </p>
                  <StayCard onOpenMessenger={() => setActiveTab('profile')} />
                </div>
              )}

              {/* Tab: PROFILE / MESSENGER */}
              {activeTab === 'profile' && (
                <div className="mx-auto max-w-5xl">
                  <h1 className="mb-1 text-xl font-bold text-[#1A202C] md:text-2xl">
                    Resident Support & Owner Messenger
                  </h1>
                  <p className="mb-6 text-xs text-[#64748B] md:text-sm">
                    Direct real-time channel with PG Management and Housekeeping Desk
                  </p>
                  <MessengerView />
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Persistent Mobile Bottom Navigation Dock */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

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
        roomTitle={selectedRoom.title}
        onSubmitSuccess={(data) => {
          triggerToast(`Visit confirmed for ${data.name} on ${data.date} (${data.slot})!`)
        }}
      />

      {/* AI Concierge Matcher Sheet */}
      <ConciergeSheet
        isOpen={isAiConciergeOpen}
        onClose={() => setIsAiConciergeOpen(false)}
        onSelectRoom={handleSelectRoom}
      />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed right-6 bottom-20 z-50 flex max-w-sm animate-bounce items-center justify-between rounded-2xl border border-white/20 bg-[#214956] p-4 text-xs font-semibold text-white shadow-2xl md:bottom-8">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
          <button
            onClick={() => setToastMessage(null)}
            className="p-1 text-white/80 hover:text-white"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  )
}

export default App
