import { SettingsError02Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import React, { PropsWithChildren } from 'react'

export default function ErrorBox({ children }: PropsWithChildren) {
  return (
    <div className="py-6 flex flex-col justify-center items-center border border-red-900  rounded-sm  mx-2 text-yellow-500 relative">
      <span className="absolute top-1 left-4 text-sm italic">
        Ocorreu um erro
      </span>
      <HugeiconsIcon
        icon={SettingsError02Icon}
        size={36}
        className="h-24 w-24 text-red-800 text-shadow-xs text-shadow-amber-400"
      />
      <span className="text-yellow-500 font-mono"> {children} </span>
    </div>
  )
}
