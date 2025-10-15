import edge from 'edge.js'

edge.global('isActiveRoute', (currentRoute: string, active: string | string[]) => {
  const normalize = (path: string) => {
    path = path.split('?')[0]
    if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1)
    path = path.replace(/\/\d+\/edit$/, '/edit')
    return path
  }

  const current = normalize(currentRoute)

  if (Array.isArray(active)) {
    return active.some((name) => normalize(name) === current)
  }

  return normalize(active) === current
})
