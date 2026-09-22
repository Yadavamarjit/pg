import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { type ThemeConfig, defaultTheme } from '@/types/theme'

interface ThemeContextType {
  theme: ThemeConfig
  setTheme: React.Dispatch<React.SetStateAction<ThemeConfig>>
  isLoading: boolean
  refreshTheme: () => Promise<void>
}

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  setTheme: () => {},
  isLoading: false,
  refreshTheme: async () => {},
})

export const applyThemeToDom = (cfg: ThemeConfig) => {
  if (typeof document === 'undefined') return

  const root = document.documentElement
  root.style.setProperty('--color-primary', cfg.primaryColor)
  root.style.setProperty('--color-secondary', cfg.secondaryColor)
  root.style.setProperty('--color-accent', cfg.accentColor)
  root.style.setProperty('--color-accent-light', cfg.accentLightColor)
  root.style.setProperty('--color-bg', cfg.bgColor)
  root.style.setProperty('--color-surface', cfg.surfaceColor)
  root.style.setProperty('--color-text-primary', cfg.textPrimary)
  root.style.setProperty('--color-text-muted', cfg.textMuted)
  root.style.setProperty('--radius-card', cfg.borderRadius)

  // Dynamically load Google Font if different
  if (cfg.fontFamily && cfg.fontFamily !== 'Montserrat') {
    const fontId = `google-font-${cfg.fontFamily.toLowerCase().replace(/\s+/g, '-')}`
    if (!document.getElementById(fontId)) {
      const link = document.createElement('link')
      link.id = fontId
      link.rel = 'stylesheet'
      link.href = `https://fonts.googleapis.com/css2?family=${cfg.fontFamily.replace(/\s+/g, '+')}:wght@300;400;500;600;700;800&display=swap`
      document.head.appendChild(link)
    }
    root.style.setProperty('--font-sans', `'${cfg.fontFamily}', sans-serif`)
  } else {
    root.style.setProperty('--font-sans', `'Montserrat', sans-serif`)
  }
}

// Immediately apply default theme to DOM on script load
if (typeof document !== 'undefined') {
  applyThemeToDom(defaultTheme)
}

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<ThemeConfig>(defaultTheme)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const refreshTheme = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:8000/api/v1/theme/?tenant_id=default', {
        signal: AbortSignal.timeout(3000),
      })
      if (res.ok) {
        const data: ThemeConfig = await res.json()
        setTheme(data)
        applyThemeToDom(data)
      } else {
        applyThemeToDom(defaultTheme)
      }
    } catch {
      // Graceful fallback to default theme if backend is offline
      applyThemeToDom(defaultTheme)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    refreshTheme()
  }, [refreshTheme])

  useEffect(() => {
    applyThemeToDom(theme)
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isLoading, refreshTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)
