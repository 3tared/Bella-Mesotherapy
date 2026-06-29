"use client"

import { type ComponentPropsWithoutRef } from "react"
import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  /**
   * Optional CSS class name to apply custom styles
   */
  className?: string
  /**
   * Whether to reverse the animation direction
   * @default false
   */
  reverse?: boolean
  /**
   * Whether to pause the animation on hover
   * @default false
   */
  pauseOnHover?: boolean
  /**
   * Content to be displayed in the marquee
   */
  children: React.ReactNode
  /**
   * Whether to animate vertically instead of horizontally
   * @default false
   */
  vertical?: boolean
  /**
   * Number of times to repeat the content
   * @default 4
   */
  repeat?: number
}

export function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    let isInView = true
    let isPageVisible = document.visibilityState === "visible"
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const syncPlayState = () => {
      const paused = !isInView || !isPageVisible || reducedMotion.matches
      root.querySelectorAll<HTMLElement>("[data-marquee-track]").forEach((track) => {
        if (paused) track.style.animationPlayState = "paused"
        else track.style.removeProperty("animation-play-state")
      })
    }

    const observer = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting
      syncPlayState()
    })
    const handleVisibility = () => {
      isPageVisible = document.visibilityState === "visible"
      syncPlayState()
    }

    observer.observe(root)
    document.addEventListener("visibilitychange", handleVisibility)
    reducedMotion.addEventListener("change", syncPlayState)
    syncPlayState()

    return () => {
      observer.disconnect()
      document.removeEventListener("visibilitychange", handleVisibility)
      reducedMotion.removeEventListener("change", syncPlayState)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      {...props}
      className={cn(
        "group flex gap-(--gap) overflow-hidden p-2 [--duration:40s] [--gap:1rem]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            data-marquee-track
            className={cn("flex shrink-0 justify-around gap-(--gap)", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  )
}
