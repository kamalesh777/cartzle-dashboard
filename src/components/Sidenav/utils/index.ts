import type { MenuObject } from 'src/types/common'

// Helper function to convert "/foo/bar/:id" to regex: /^\/foo\/bar\/[^/]+$/
function pathToRegex(path: string): RegExp | null {
  if (!path) return null
  // Replace ":param" with "([^/]+)"
  return new RegExp('^' + path.replace(/:[^/]+/g, '[^/]+') + '$')
}

export function findMenuByPath(menu: MenuObject[], pathname: string): MenuObject | null {
  if (!menu) return null
  for (const item of menu) {
    if (item.path) {
      // Direct match or dynamic param match
      if (item.path === pathname) return item
      const regex = pathToRegex(item.path)
      if (regex && regex.test(pathname)) {
        return item
      }
    }
    // pagemenu is not based on full path matching but href hashes, skip here
    if (item.children) {
      const match = findMenuByPath(item.children, pathname)
      if (match) return match
    }
  }
  return null
}
