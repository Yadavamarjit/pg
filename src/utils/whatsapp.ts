export const generateWhatsAppUrl = (
  phone: string,
  data: { name: string; room: string; slot: string; date?: string },
) => {
  const dateStr = data.date ? ` on ${data.date}` : ''
  const text = encodeURIComponent(
    `Hi UrbanNest PG, I am ${data.name || 'a prospect resident'}. I would like to confirm my physical visit for ${data.room}${dateStr} during the ${data.slot} time slot.`,
  )
  const cleanPhone = phone.replace(/\D/g, '') || '919876543210'
  return `https://wa.me/${cleanPhone}?text=${text}`
}
