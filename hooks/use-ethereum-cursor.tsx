"use client"

import { useEffect, useRef, useState } from "react"

interface CursorPosition {
  x: number
  y: number
}

interface CursorState {
  isHovering: boolean
  isClicking: boolean
  isLoading: boolean
}

export function useEthereumCursor() {
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [cursorState, setCursorState] = useState<CursorState>({
    isHovering: false,
    isClicking: false,
    isLoading: false,
  })
  const [isVisible, setIsVisible] = useState(false)
  const requestRef = useRef<number>()

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const updateCursorPosition = (e: MouseEvent) => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }

      requestRef.current = requestAnimationFrame(() => {
        setPosition({ x: e.clientX, y: e.clientY })
        setIsVisible(true)
      })
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    const handleMouseDown = () => {
      setCursorState((prev) => ({ ...prev, isClicking: true }))
    }

    const handleMouseUp = () => {
      setCursorState((prev) => ({ ...prev, isClicking: false }))
    }

    const handleElementHover = (e: Event) => {
      const target = e.target as HTMLElement
      const isInteractive = target.matches('button, a, input, textarea, select, [role="button"], [tabindex]')
      setCursorState((prev) => ({ ...prev, isHovering: isInteractive }))
    }

    const handleElementLeave = () => {
      setCursorState((prev) => ({ ...prev, isHovering: false }))
    }

    // Mouse movement
    document.addEventListener("mousemove", updateCursorPosition)
    document.addEventListener("mouseenter", handleMouseEnter)
    document.addEventListener("mouseleave", handleMouseLeave)

    // Click states
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    // Hover states for interactive elements
    document.addEventListener("mouseover", handleElementHover)
    document.addEventListener("mouseout", handleElementLeave)

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
      if (timeoutId) {
        clearTimeout(timeoutId)
      }

      document.removeEventListener("mousemove", updateCursorPosition)
      document.removeEventListener("mouseenter", handleMouseEnter)
      document.removeEventListener("mouseleave", handleMouseLeave)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      document.removeEventListener("mouseover", handleElementHover)
      document.removeEventListener("mouseout", handleElementLeave)
    }
  }, [])

  const setLoading = (loading: boolean) => {
    setCursorState((prev) => ({ ...prev, isLoading: loading }))
  }

  return {
    position,
    cursorState,
    isVisible,
    setLoading,
  }
}
