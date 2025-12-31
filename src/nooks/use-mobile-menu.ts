import { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import useMediaQuery from './use-media-query'

export default function useMobileMenu() {
  const isMobile = useMediaQuery('(max-width: 1024px)')
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const menuRef = useRef<HTMLUListElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const pathname = usePathname()

  const tabIndex = isMobile ? (isMenuVisible ? 0 : -1) : 0
  const isHiddenFromScreenReaders = isMobile && !isMenuVisible

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuVisible(false)
        toggleRef.current?.focus()
      }
    },
    [setIsMenuVisible],
  )

  useEffect(() => {
    if (isMenuVisible) {
      document.body.classList.add('overflow-y-hidden')
      document.addEventListener('keydown', handleKeyDown)

      return () => {
        document.removeEventListener('keydown', handleKeyDown)
      }
    } else {
      document.body.classList.remove('overflow-y-hidden')
    }
  }, [isMenuVisible])

  useEffect(() => {
    if (isMenuVisible) {
      setIsMenuVisible(false)
    }
  }, [pathname])

  return {
    isMenuVisible,
    isHiddenFromScreenReaders,
    setIsMenuVisible,
    tabIndex,
    menuRef,
    toggleRef,
  }
}
