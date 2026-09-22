export interface ThemeConfig {
  tenantId: string
  brandName: string
  tagline: string
  logoUrl?: string
  primaryColor: string
  secondaryColor: string
  accentColor: string
  accentLightColor: string
  bgColor: string
  surfaceColor: string
  textPrimary: string
  textMuted: string
  fontFamily: string
  borderRadius: string
}

export const defaultTheme: ThemeConfig = {
  tenantId: 'default',
  brandName: 'UrbanNest PG',
  tagline: 'Premium Co-living & PG',
  logoUrl: '',
  primaryColor: '#214956',
  secondaryColor: '#124000',
  accentColor: '#F35600',
  accentLightColor: '#F87A50',
  bgColor: '#FAF6F0',
  surfaceColor: '#FFFFFF',
  textPrimary: '#1A202C',
  textMuted: '#64748B',
  fontFamily: 'Montserrat',
  borderRadius: '1.5rem',
}
