import React from 'react'
import './bubbles.css'
import { cn } from '@/lib/utils'
interface BubblesSectionProps {
  className?: string
}

export default function BubblesSection({
  className,
}: BubblesSectionProps = {}) {
  return (
    <section className={cn(`h-svh`, className)}>
      <div className="bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
    </section>
  )
}
