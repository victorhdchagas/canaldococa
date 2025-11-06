import React, { PropsWithChildren } from 'react'

export default function Subtitle({ children }: PropsWithChildren) {
  return (
    <h3 className="text-yellow-200 px-1 text-xl font-bold text-shadow-xs ">
      {children}
    </h3>
  )
}
