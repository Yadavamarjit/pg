Project Specification: UrbanNest PG Web Application1. Technology Stack & DependenciesFramework: Next.js (App Router), React, TypeScript.Styling: Tailwind CSS.Motion & Gestures: Framer Motion (spring physics, drag gestures, layoutId transitions).Component Primitives: Radix UI / Shadcn UI primitives, vaul (drawer/bottom sheet physics).Icons: lucide-react.Forms & Validation: react-hook-form with zod.State Management: URL search parameters (next/navigation) for syncable filters + React Context/Zustand for lightweight local state.2. Design System & Theme TokensConfigure the project styling to match the following warm editorial hospitality aesthetic:Color Tokens:Primary / CTA: #214956 (Deep Teal)   Secondary / Nature Accent: #124000 (Forest Olive)   Highlight / Urgency: #F35600 / #F87A50 (Terracotta / Warm Coral)   Base Background: #FAF6F0 / #FDFBF7 (Soft Sand / Cream)   Surface / Cards: #FFFFFF (Pure White)   Text Primary: #1A202C (Near Black)   Text Muted: #64748B (Slate Gray)   Border Subtle: rgba(33, 73, 86, 0.08)   Typography:Font Family: Montserrat, sans-serif (imported via next/font/google).   Scale: h1 (28–32px / bold), h2 (20–24px / bold), h3 (16–18px / semibold), body (14–15px / regular), micro-copy (11–12px / tracking-wider / uppercase).   Radii & Shadows:Large Cards & Containers: rounded-2xl (16px–20px).   Buttons & Inputs: rounded-xl (12px).   Filter Bottom Sheet: rounded-t-3xl (24px).   Elevation: Soft ambient drop shadows (0 8px 24px -4px rgba(33, 73, 86, 0.06)).3. Layout & Mobile Shell ArchitectureViewport Shell: Responsive mobile container (max-w-md mx-auto min-h-screen relative bg-[#FAF6F0] text-[#1A202C] shadow-2xl overflow-x-hidden).   Sticky Header:56px height, backdrop blur: backdrop-blur-xl bg-[#FAF6F0]/85 border-b border-[#214956]/10.   Brand logo (UrbanNest PG) on left, profile avatar / notification badge on right.   Persistent Bottom Navigation Dock:Fixed dock pinned to the bottom with safe area padding: pb-[calc(1rem+env(safe-area-inset-bottom))].   4 Destinations: Home, Search, Bookings, Profile.   Smooth gliding active pill indicator using Framer Motion (layoutId="activeBottomNavPill").   4. Core Pages & Component ArchitectureA. Home & Discovery Screen (/)Hero Banner: Ambient photography card showcasing communal spaces with headline: "Discover Your Comfortable Home Away From Home" and subtext highlighting clean, secure living.   Quick Shortcut Grid: 4 rounded action pills:Find Rooms (routes to /rooms)   Explore Amenities (smooth scroll to amenities)   Meet Community (routes to community tab)   Schedule Visit (opens schedule visit modal)   Recently Viewed / Top Rooms Horizontal Reel: Swipeable room cards featuring room photo, room type title, monthly rent (e.g., ₹18,000/mo), availability indicator, and quick tap action.   Common Spaces Showcase: Cards for Modern Kitchen & Dining, Community Lounge, and Outdoor Terrace with short descriptive captions.   Floating WhatsApp Action: Bottom-right sticky pill button trigger: "Ask a Question via WhatsApp".   B. Room Listings & Slide-Up Filter (/rooms)List View: Stacked room cards (Single Deluxe Room, Double Sharing Room, Premium Studio Suite) showing bed counts, attached bathroom tags, pricing, and live status badges.   Slide-Up Filter Bottom Sheet (vaul primitive):Opens via floating "Filter" button.   Pull handle at top (w-12 h-1.5 bg-neutral-300 rounded-full mx-auto my-3).   Budget range slider (₹5,000 to ₹30,000) with dynamic tooltip counter.   Segmented room type chips (Single, Double, Studio) with sliding active pill.   Toggle switches for amenities: Wi-Fi, AC, Attached Bath, Gym, Housekeeping.   Synchronizes selections directly with Next.js URL query params (/rooms?type=single&ac=true).   C. Room Detail & Availability Calendar (/rooms/[id])Media Gallery: Swipeable image carousel with active indicator dots expanding into pills on scroll (Hero room view, attached bathroom, study desk, wardrobe, balcony).   Key Specs: Icon matrix highlighting private washroom, high-speed Wi-Fi, daily housekeeping, and power backup.   Interactive Availability Calendar:Monthly date picker grid color-coding dates into Open (soft teal fill #EBF5F5) and Booked (grayed out).   Interactive selection bounce animation with persistent price summary card.   Neighborhood Landmarks Card: Walking and transit times to nearby metro stations, libraries, and colleges.   Sticky Bottom CTA: Persistent primary button "Schedule a Physical Visit".   D. Visit Scheduling Flow (Modal)Clean dialog overlay with fields:Full Name   Phone Number (with Indian 10-digit format validation)   Preferred Visit Date (date picker)   Time Slot (Morning 10-12, Afternoon 2-5, Evening 5-8)   Actions:"Request Visit Confirmation" primary button.   Secondary fallback link: "Or chat via WhatsApp" (pre-fills message with name, room type, and chosen slot).   E. Resident Dashboard & Owner Messenger (/dashboard)Dashboard Summary:Active room booking card (e.g., Studio Suite 302 - Scheduled Visit).   Quick-access cards for rent payments and housekeeping service tickets.   In-App Direct Messenger:Tabs for PG Owner - UrbanNest and Housekeeping Support.   Chat timeline with dual-tone message bubbles and real-time typing indicator.   5. Micro-Interactions & Animation SpecsMotion Physics: Use spring configurations across all components:TypeScriptexport const springTransition = {
  type: "spring",
  stiffness: 350,
  damping: 25,
};
Card & Button Tap Physics: Add whileTap={{ scale: 0.97 }} and whileHover={{ y: -2 }}. Trigger light mobile haptic feedback on booking submit: window.navigator?.vibrate?.(12).Skeleton Shimmer: Display an animated linear gradient pulse skeleton while images are loading.6. AI & Smart Utility FeaturesAI Room Matcher Concierge:Collapsible conversational assistant interface.Accepts natural language queries (e.g., "Looking for a private single room with AC and desk for UPSC preparation under 20k"), parses preferences, and returns matching listing cards.Smart All-Inclusive Rent Estimator:Dynamic calculator card toggling base rent, meal subscription tiers (2 meals vs. 3 meals), and optional AC power metered package, updating the final monthly total live.Direct WhatsApp Handoff Generator:Function to construct pre-formatted WhatsApp URLs:TypeScriptconst generateWhatsAppUrl = (phone: string, data: { name: string; room: string; slot: string }) => {
  const text = encodeURIComponent(`Hi UrbanNest PG, I am ${data.name}. I would like to confirm my physical visit for ${data.room} on ${data.slot}.`);
  return `https://wa.me/${phone}?text=${text}`;
};
7. File & Directory StructureOrganize the project using this strict directory layout:Plaintextsrc/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    // Home & landing screen
│   ├── rooms/
│   │   ├── page.tsx                // Listings & filter view
│   │   └── [id]/
│   │       └── page.tsx            // Room detail & calendar
│   └── dashboard/
│       └── page.tsx                // Resident dashboard & chat
├── components/
│   ├── common/
│   │   ├── Header.tsx              // Sticky blur header
│   │   ├── BottomNav.tsx           // Pinned bottom dock
│   │   └── WhatsAppFloat.tsx       // Sticky WhatsApp trigger
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── QuickActions.tsx
│   │   └── CommonSpaces.tsx
│   ├── rooms/
│   │   ├── RoomCard.tsx
│   │   ├── FilterDrawer.tsx        // Vaul slide-up sheet
│   │   ├── RoomGallery.tsx         // Swipeable carousel
│   │   └── BookingCalendar.tsx     // Availability matrix
│   ├── booking/
│   │   └── ScheduleVisitModal.tsx
│   ├── ai/
│   │   └── ConciergeSheet.tsx      // Natural language room matcher
│   └── dashboard/
│       ├── StayCard.tsx
│       └── MessengerView.tsx
├── data/
│   └── mockRooms.ts                // Full mock data with pricing & amenities
├── types/
│   └── index.ts                    // Strict TypeScript interfaces
└── styles/
    └── globals.css
8. Implementation OrderSetup project tokens in tailwind.config.ts and import Google Font Montserrat in layout.tsx.   Implement Header, BottomNav, and safe-area wrappers to lock down the mobile layout shell.   Build the mock data schema in src/data/mockRooms.ts supporting single, double, and studio layouts.   Implement the Home page with hero visual, category pills, and common area cards.   Implement the Room Listings page with the slide-up FilterDrawer using vaul.   Implement the Room Detail page featuring the swipeable gallery and interactive date selection calendar.   Implement the ScheduleVisitModal with input validation and WhatsApp redirect generation.   Implement the ResidentDashboard and MessengerView components.   