export interface Room {
  id: string
  title: string
  type: 'single' | 'double' | 'studio'
  typeLabel: string
  rent: number
  originalRent?: number
  deposit: number
  availableFrom: string
  bedsAvailable: number
  attachedBathroom: boolean
  ac: boolean
  wifi: boolean
  gym: boolean
  housekeeping: boolean
  powerBackup: boolean
  rating: number
  reviewCount: number
  images: string[]
  description: string
  specs: {
    icon: string
    title: string
    desc: string
  }[]
  landmarks: {
    name: string
    distance: string
    type: 'metro' | 'college' | 'library' | 'mall'
  }[]
  bookedDates: string[] // YYYY-MM-DD
}

export interface FilterState {
  type: 'all' | 'single' | 'double' | 'studio'
  maxBudget: number
  ac: boolean
  attachedBath: boolean
  wifi: boolean
  gym: boolean
  housekeeping: boolean
}

export interface VisitFormData {
  fullName: string
  phone: string
  visitDate: string
  timeSlot: 'Morning (10 AM - 12 PM)' | 'Afternoon (2 PM - 5 PM)' | 'Evening (5 PM - 8 PM)'
  notes?: string
}

export interface ChatMessage {
  id: string
  sender: 'owner' | 'housekeeping' | 'user'
  text: string
  timestamp: string
  status?: 'sent' | 'delivered' | 'read'
}

export interface SystemSpace {
  id: string
  title: string
  subtitle: string
  image: string
  features: string[]
}
