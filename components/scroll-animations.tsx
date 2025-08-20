"use client"

import { useEffect, useRef } from "react"

export function ScrollAnimations() {
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    // Parallax scrolling effect
    const handleScroll = () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll(".parallax-slow, .parallax-fast")

      parallaxElements.forEach((element) => {
        const speed = element.classList.contains("parallax-slow") ? 0.5 : 0.8
        const yPos = -(scrolled * speed)
        ;(element as HTMLElement).style.setProperty("--scroll-y", `${yPos}px`)
      })
    }

    // Intersection Observer for fade-in animations
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    )

    // Observe all fade-in elements
    const fadeElements = document.querySelectorAll(".fade-in-up")
    fadeElements.forEach((el) => observerRef.current?.observe(el))

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      observerRef.current?.disconnect()
    }
  }, [])

  return null
}
