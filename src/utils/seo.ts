export interface SeoConfig {
  title: string
  description: string
  keywords?: string
  ogImage?: string
  ogUrl?: string
  jsonLd?: Record<string, unknown>
}

export function updateSeoMetadata(config: SeoConfig) {
  if (typeof document === 'undefined') return

  // Update Page Title
  document.title = config.title

  // Helper to set or update meta tag
  const setMetaTag = (selector: string, attrName: string, attrValue: string, content: string) => {
    let element = document.querySelector(selector)
    if (!element) {
      element = document.createElement('meta')
      element.setAttribute(attrName, attrValue)
      document.head.appendChild(element)
    }
    element.setAttribute('content', content)
  }

  // Basic Meta Tags
  setMetaTag('meta[name="description"]', 'name', 'description', config.description)
  if (config.keywords) {
    setMetaTag('meta[name="keywords"]', 'name', 'keywords', config.keywords)
  }

  // Open Graph Social Tags
  setMetaTag('meta[property="og:title"]', 'property', 'og:title', config.title)
  setMetaTag('meta[property="og:description"]', 'property', 'og:description', config.description)
  if (config.ogImage) {
    setMetaTag('meta[property="og:image"]', 'property', 'og:image', config.ogImage)
  }
  if (config.ogUrl) {
    setMetaTag('meta[property="og:url"]', 'property', 'og:url', config.ogUrl)
  }

  // Twitter Card Tags
  setMetaTag('meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image')
  setMetaTag('meta[name="twitter:title"]', 'name', 'twitter:title', config.title)
  setMetaTag('meta[name="twitter:description"]', 'name', 'twitter:description', config.description)
  if (config.ogImage) {
    setMetaTag('meta[name="twitter:image"]', 'name', 'twitter:image', config.ogImage)
  }

  // JSON-LD Schema.org Structured Data
  if (config.jsonLd) {
    let scriptTag = document.querySelector<HTMLScriptElement>('#json-ld-schema')
    if (!scriptTag) {
      scriptTag = document.createElement('script')
      scriptTag.id = 'json-ld-schema'
      scriptTag.type = 'application/ld+json'
      document.head.appendChild(scriptTag)
    }
    scriptTag.text = JSON.stringify(config.jsonLd)
  }
}
