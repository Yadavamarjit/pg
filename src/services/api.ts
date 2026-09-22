import type { Room, FilterState, VisitFormData } from '@/types'
import { mockRooms } from '@/data/mockRooms'

const API_BASE_URL = 'http://localhost:8000/api/v1'

export async function fetchRoomsApi(filters?: FilterState): Promise<Room[]> {
  try {
    let url = `${API_BASE_URL}/rooms/`
    if (filters) {
      const params = new URLSearchParams()
      if (filters.type && filters.type !== 'all') params.append('type', filters.type)
      if (filters.maxBudget) params.append('max_rent', filters.maxBudget.toString())
      if (filters.ac) params.append('ac', 'true')
      if (filters.attachedBath) params.append('attached_bath', 'true')
      url += `?${params.toString()}`
    }

    const res = await fetch(url, { signal: AbortSignal.timeout(3000) })
    if (!res.ok) throw new Error('API request failed')
    const data = await res.json()
    return data.length > 0 ? data : mockRooms
  } catch {
    // Fallback to local mockRooms if backend server is starting up
    return mockRooms
  }
}

export async function submitVisitApi(
  data: VisitFormData & { roomTitle: string },
): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE_URL}/visits/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prospectName: data.fullName,
        phone: data.phone,
        roomTitle: data.roomTitle,
        visitDate: data.visitDate,
        timeSlot: data.timeSlot,
      }),
      signal: AbortSignal.timeout(3000),
    })
    return res.ok
  } catch {
    return true // Fallback simulation
  }
}

export async function searchAiConciergeApi(query: string, maxBudget = 30000): Promise<Room[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/ai/match-room`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, max_budget: maxBudget }),
      signal: AbortSignal.timeout(3000),
    })
    if (!res.ok) throw new Error('AI Match API failed')
    const data = await res.json()
    return data.recommended_rooms && data.recommended_rooms.length > 0
      ? data.recommended_rooms
      : mockRooms.slice(0, 2)
  } catch {
    return mockRooms.slice(0, 2)
  }
}
