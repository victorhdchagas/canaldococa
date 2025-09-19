import {
  Loading03FreeIcons,
  SendToMobileFreeIcons,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { ButtonHTMLAttributes } from 'react'

export default function SubmitButton({
  children,
  ...props
}: ButtonHTMLAttributes<{}>) {
  return (
    <button
      type="submit"
      {...props}
      className="group p-3 flex flex-row justify-center items-center border-2 bg-gray-950 border-amber-700  rounded-lg  mx-2 text-yellow-500 gap-2  transition-all  font-mono cursor-pointer"
    >
      {!props.disabled && (
        <>
          {children}
          <HugeiconsIcon
            icon={SendToMobileFreeIcons}
            size={12}
            className="h-4 w-auto text-red-800 text-shadow-xs text-shadow-amber-400 group-hover:scale-150 transition-all"
          />
        </>
      )}
      {props.disabled && (
        <>
          {children}
          <HugeiconsIcon
            icon={Loading03FreeIcons}
            size={12}
            className="h-4 w-auto text-red-800 text-shadow-xs text-shadow-amber-400 group-hover:scale-150 transition-all animate-spin"
          />
        </>
      )}
    </button>
  )
}
