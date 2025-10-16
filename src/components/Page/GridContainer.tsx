import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export default function GridContainer({
  children,
  className,
}: ComponentProps<'div'>) {
  return (
    <div
      className={twMerge(
        'font-sans  grid grid-cols-1 md:grid-cols-2 container',
        className,
      )}
    >
      {children}
    </div>
  )
}
