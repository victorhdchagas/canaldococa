import { CursorDisabled01FreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { ButtonHTMLAttributes } from 'react'
export default function BoxButton({
  children,
  ...props
}: ButtonHTMLAttributes<{}>) {
  return (
    <button
      className="w-full text-lg rounded-sm border bg-gray-950 border-yellow-600 text-yellow-500
      cursor-pointer
      disabled:border-gray-800
      disabled:text-gray-400
      disabled:bg-black
      disabled:shadow-gray-950
      disabled:cursor-not-allowed
       flex justify-center items-center font-bold p-4 hover:scale-105 shadow-md hover:shadow-lg shadow-amber-950 transition-all hover:-rotate-2 hover:text-2xl
       relative group"
      {...props}
    >
      {props.disabled && (
        <HugeiconsIcon
          icon={CursorDisabled01FreeIcons}
          size={24}
          className="absolute -top-1.5 z-10 -right-1.5  rounded-full bg-black border-yellow-800 border-2 group-hover:scale-150 group-hover:animate-pulse transition-all"
        />
      )}

      {children}
    </button>
  )
}
