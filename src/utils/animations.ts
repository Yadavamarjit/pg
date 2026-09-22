export const springTransition = {
  type: 'spring',
  stiffness: 350,
  damping: 25,
}

export const cardTapPhysics = {
  whileTap: { scale: 0.97 },
  whileHover: { y: -2 },
  transition: springTransition,
}

export const triggerHaptic = (ms = 12) => {
  if (typeof window !== 'undefined' && window.navigator?.vibrate) {
    window.navigator.vibrate(ms)
  }
}
