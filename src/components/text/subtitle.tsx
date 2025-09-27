import React, { PropsWithChildren } from 'react'

export default function Subtitle({ children }: PropsWithChildren) {
  return (
    <h3 className="text-yellow-300 text-lg font-medium text-shadow-xs text-shadow-amber-400 ">
      {children}
    </h3>
  )
}
