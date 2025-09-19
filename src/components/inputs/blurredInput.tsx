'use client'
import { EyeFreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import React, { PropsWithChildren, useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function BlurredElement({
  children,
  startVisible = false,
}: PropsWithChildren<{ startVisible?: false }>) {
  const [blur, setBlur] = useState<boolean>(!startVisible)
  return (
    <div className="flex flex-row justify-between w-full px-2 gap-2">
      <div className={twMerge('flex-10', blur ? 'blur-sm' : '')}>
        {children}
      </div>
      <button
        className="cursor-pointer"
        type="button"
        onClick={() => setBlur((state) => !state)}
      >
        <HugeiconsIcon icon={EyeFreeIcons} size={16} />
      </button>
    </div>
  )
}
