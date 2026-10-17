export const generateWhatsAppUrl = (
  phone: string,
  data: { name: string; room: string; slot: string; date?: string },
) => {
  const dateStr = data.date ? ` on ${data.date}` : ''
  const text = encodeURIComponent(
    `Hi Bhagwati Homes, I am ${data.name || 'a prospect resident'}. I would like to confirm my physical visit for ${data.room}${dateStr} during the ${data.slot} time slot.`,
  )
  const cleanPhone = phone.replace(/\D/g, '') || '917357414141'
  return `https://wa.me/${cleanPhone}?text=${text}`
}

export const generatePriceInquiryWhatsAppUrl = (
  phone: string = '917357414141',
  data: { roomTitle: string; layout?: string },
) => {
  const text = encodeURIComponent(
    `Hi Bhagwati Homes, I'm interested in "${data.roomTitle}" (${data.layout || 'available layout'}). Could you please share the current rent pricing, deposit terms, and meal plan options?`,
  )
  const cleanPhone = phone.replace(/\D/g, '') || '917357414141'
  return `https://wa.me/${cleanPhone}?text=${text}`
}

