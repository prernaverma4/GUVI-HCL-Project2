"use client"

import { useEffect, useRef } from "react"

export function CursorEffects() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const mousePosition = useRef({ x: 0, y: 0 })
  const trailPosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const supportsHover = window.matchMedia("(hover: hover)").matches
    if (!supportsHover) return

    const cursor = cursorRef.current
    const trail = trailRef.current
    if (!cursor || !trail) return

    document.body.classList.add("custom-cursor-active")

    const updateCursor = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY }
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
    }

    const updateTrail = () => {
      const dx = mousePosition.current.x - trailPosition.current.x
      const dy = mousePosition.current.y - trailPosition.current.y

      trailPosition.current.x += dx * 0.1
      trailPosition.current.y += dy * 0.1

      trail.style.left = `${trailPosition.current.x}px`
      trail.style.top = `${trailPosition.current.y}px`

      requestAnimationFrame(updateTrail)
    }

    const handleMouseEnter = () => {
      cursor.classList.add("cursor-hover")
    }

    const handleMouseLeave = () => {
      cursor.classList.remove("cursor-hover")
    }

    const handleMouseDown = () => {
      cursor.classList.add("cursor-click")
    }

    const handleMouseUp = () => {
      cursor.classList.remove("cursor-click")
    }

    // Add event listeners
    document.addEventListener("mousemove", updateCursor)
    document.addEventListener("mousedown", handleMouseDown)
    document.addEventListener("mouseup", handleMouseUp)

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"]')
    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    // Start trail animation
    updateTrail()

    return () => {
      document.body.classList.remove("custom-cursor-active")
      document.removeEventListener("mousemove", updateCursor)
      document.removeEventListener("mousedown", handleMouseDown)
      document.removeEventListener("mouseup", handleMouseUp)
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" />
      <div ref={trailRef} className="custom-cursor-trail" />
    </>
  )
}
