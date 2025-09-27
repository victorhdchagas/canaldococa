import React, { PropsWithChildren } from 'react'

export default function Title({ children }: PropsWithChildren) {
  return (
    <h1 className="text-yellow-500 text-2xl font-bold text-shadow-xs text-shadow-amber-400 container font-sans">
      {children}
    </h1>
  )
}
