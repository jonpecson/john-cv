"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"

interface CounterProps {
  end: number
  duration?: number
  delay?: number
  prefix?: string
  suffix?: string
  title: string
  subtitle: string
}

export function Counter({ end, duration = 2, delay = 0, prefix = "", suffix = "", title, subtitle }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let startTime: number | null = null
    let animationFrame: number

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(updateCount)
      }
    }

    const timeoutId = setTimeout(() => {
      animationFrame = requestAnimationFrame(updateCount)
    }, delay * 1000)

    return () => {
      clearTimeout(timeoutId)
      cancelAnimationFrame(animationFrame)
    }
  }, [end, duration, delay, isInView])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col"
    >
      <h3 className="text-4xl font-bold text-white md:text-5xl">
        {prefix}
        <span>{count}</span>
        {suffix}
      </h3>
      <div className="mt-2 flex flex-col">
        <span className="text-sm font-medium uppercase tracking-wider text-cv-light-gray">{title}</span>
        <span className="text-sm font-medium uppercase tracking-wider text-cv-light-gray">{subtitle}</span>
      </div>
    </motion.div>
  )
}

