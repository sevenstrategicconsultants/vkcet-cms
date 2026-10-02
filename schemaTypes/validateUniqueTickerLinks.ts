export function validateUniqueTickerLinks(value: unknown): true | string {
  if (!Array.isArray(value)) return true

  const links = value
    .map((item: unknown) => {
      if (typeof item !== 'object' || item === null || !('link' in item)) return ''
      return typeof item.link === 'string' ? item.link.trim() : ''
    })
    .filter((link) => link.length > 0)
    .map((link) => {
      try {
        return new URL(link).href
      } catch {
        return link
      }
    })

  return new Set(links).size === links.length || 'Each URL can only appear once in this ticker.'
}