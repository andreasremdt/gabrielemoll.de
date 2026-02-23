import { useCallback, useEffect, useRef } from 'react'

const selector =
  'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled])'

export default function useFocusTrap<T extends HTMLElement>(active: boolean) {
  const ref = useRef<T>(null)

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (!ref.current) return

    const elements = ref.current.querySelectorAll<HTMLElement>(selector)
    const firstElement = elements[0]
    const lastElement = elements[elements.length - 1]

    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault()
          lastElement.focus()
        }
      } else if (document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }
  }, [])

  useEffect(() => {
    if (active) {
      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    }
  }, [active, handleKeyDown])

  return ref
}
