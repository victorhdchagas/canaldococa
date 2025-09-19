import React, { PropsWithChildren } from 'react'

export default function Subtitle({ children }: PropsWithChildren) {
  return (
    <span className="text-yellow-500 text-lg font-bold text-shadow-xs text-shadow-amber-400 container mx-auto">
      {children}
    </span>
  )
}
