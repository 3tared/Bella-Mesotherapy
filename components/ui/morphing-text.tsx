"use client"

import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"

const morphTime = 1.5
const cooldownTime = 0.5

interface MorphingTextProps {
  className?: string
  texts: string[]
}

export const MorphingText: React.FC<MorphingTextProps> = ({
  texts,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    const context = canvas?.getContext("2d")
    if (!container || !canvas || !context || texts.length === 0) return

    let animationFrameId = 0
    let elapsed = 0
    let lastTime = performance.now()
    let isInView = true
    let isPageVisible = document.visibilityState === "visible"
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")

    const drawWord = (
      text: string,
      alpha: number,
      blur: number,
      width: number,
      height: number
    ) => {
      const styles = getComputedStyle(container)
      context.save()
      context.globalAlpha = alpha
      context.filter = blur > 0.05 ? `blur(${blur}px)` : "none"
      context.fillStyle = styles.color
      context.font = `${styles.fontWeight} ${styles.fontSize} ${styles.fontFamily}`
      context.textAlign = "center"
      context.textBaseline = "middle"
      context.direction = styles.direction === "rtl" ? "rtl" : "ltr"
      if ("letterSpacing" in context) {
        ;(context as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing =
          styles.letterSpacing
      }
      context.fillText(text, width / 2, height / 2)
      context.restore()
    }

    const draw = () => {
      const dpr = window.devicePixelRatio || 1
      const width = canvas.width / dpr
      const height = canvas.height / dpr
      context.clearRect(0, 0, width, height)

      if (reducedMotion.matches || texts.length === 1) {
        drawWord(texts[0], 1, 0, width, height)
        return
      }

      const cycleDuration = morphTime + cooldownTime
      const cycleIndex = Math.floor(elapsed / cycleDuration)
      const withinCycle = elapsed % cycleDuration
      const current = texts[cycleIndex % texts.length]
      const next = texts[(cycleIndex + 1) % texts.length]

      if (withinCycle < cooldownTime) {
        drawWord(current, 1, 0, width, height)
        return
      }

      const fraction = Math.min(
        1,
        (withinCycle - cooldownTime) / morphTime
      )
      const currentAlpha = Math.pow(1 - fraction, 0.4)
      const nextAlpha = Math.pow(fraction, 0.4)
      const currentBlur = Math.min(
        8 / Math.max(1 - fraction, 0.001) - 8,
        100
      )
      const nextBlur = Math.min(8 / Math.max(fraction, 0.001) - 8, 100)

      drawWord(current, currentAlpha, currentBlur, width, height)
      drawWord(next, nextAlpha, nextBlur, width, height)
    }

    const resize = () => {
      const { width, height } = container.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      draw()
    }

    const animate = (time: number) => {
      elapsed += Math.min((time - lastTime) / 1000, 0.1)
      lastTime = time
      draw()
      animationFrameId = requestAnimationFrame(animate)
    }

    const stop = () => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = 0
      if (reducedMotion.matches) {
        elapsed = 0
        draw()
      }
    }

    const syncAnimation = () => {
      const shouldPause = !isInView || !isPageVisible || reducedMotion.matches
      if (shouldPause) stop()
      else if (!animationFrameId) {
        lastTime = performance.now()
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    const resizeObserver = new ResizeObserver(resize)
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      isInView = entry.isIntersecting
      syncAnimation()
    })
    const handleVisibility = () => {
      isPageVisible = document.visibilityState === "visible"
      syncAnimation()
    }

    resizeObserver.observe(container)
    intersectionObserver.observe(container)
    document.addEventListener("visibilitychange", handleVisibility)
    reducedMotion.addEventListener("change", syncAnimation)
    void document.fonts.ready.then(resize)
    resize()
    syncAnimation()

    return () => {
      cancelAnimationFrame(animationFrameId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
      document.removeEventListener("visibilitychange", handleVisibility)
      reducedMotion.removeEventListener("change", syncAnimation)
    }
  }, [texts])

  return (
    <div
      ref={containerRef}
      data-morphing-text
      className={cn(
        "relative mx-auto h-16 w-full max-w-3xl text-center font-sans text-[40pt] leading-none font-bold md:h-24 lg:text-[6rem]",
        className
      )}
    >
      <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0" />
      <span className="sr-only">{texts.join(", ")}</span>
    </div>
  )
}
