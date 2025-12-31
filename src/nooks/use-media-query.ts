import { useCallback, useSyncExternalStore } from 'react'

export default function useMediaQuery(query: string) {
  const subscribe = useCallback(
    (callback: (matches: MediaQueryListEvent) => void) => {
      const mediaQuery = window.matchMedia(query)

      mediaQuery.addEventListener('change', callback)

      return () => {
        mediaQuery.removeEventListener('change', callback)
      }
    },
    [query],
  )

  const getSnapshot = useCallback(() => {
    return window.matchMedia(query).matches
  }, [query])

  const getServerSnapshot = useCallback(() => {
    return false
  }, [])

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
