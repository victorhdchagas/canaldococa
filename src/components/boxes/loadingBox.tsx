import { Loading02FreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import React from 'react'

export default function LoadingBox() {
  return (
    <div className="flex justify-start items-center flex-col">
      <HugeiconsIcon
        icon={Loading02FreeIcons}
        size={36}
        className="animate-spin h-24 w-24 text-red-800 text-shadow-xs text-shadow-amber-400"
      />
      <span className="text-yellow-500 font-mono"> Carregando </span>
    </div>
  )
}
