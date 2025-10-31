import { ChangeEvent, useState } from 'react'
import { Label } from '../ui/label'
import { HugeiconsIcon } from '@hugeicons/react'
import {
  EyeFreeIcons,
  InformationSquareFreeIcons,
  UserWarning01FreeIcons,
} from '@hugeicons/core-free-icons'
import { Input } from '../ui/input'
import { AnimatePresence, motion } from 'framer-motion'
import { EyeClosedIcon } from 'lucide-react'

type InputType = 'number' | 'text'
export interface FormFieldProps<T extends InputType> {
  label: string
  name: string
  DefaultValue?: T extends 'number' ? number : string
  helpText: string
  type: T
  unit?: string // Ex: "XP", "mensagens"
  disabled?: boolean
  placeholder?: string
  isLoading?: boolean
  error?: string
  isBlur?: boolean
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export function FormField<T extends InputType>({
  label,
  name,
  DefaultValue,
  helpText,
  type,
  unit,
  disabled,
  placeholder,
  isLoading = false,
  error = '',
  isBlur = false,
  onChange,
}: FormFieldProps<T>) {
  const [showHelp, setShowHelp] = useState(false)
  const [blurActivated, setBlurActivated] = useState(isBlur)
  return (
    <div className="flex flex-col w-full border-b border-gray-600 p-2 md:pb-3 ">
      <div className="flex md:flex-row flex-col gap-1 md:items-center w-full rounded-t-md relative ">
        <div className="flex justify-between items-center md:w-24">
          <Label htmlFor={name} className="text-sm text-gray-400 font-mono">
            {label}
          </Label>
          {helpText && helpText.length > 0 && (
            <button
              onClick={() => setShowHelp((s) => !s)}
              className="transition-all text-gray-400 hover:text-yellow-500 md:hidden"
              type="button"
              aria-label={`Ajuda sobre ${label}`}
            >
              <HugeiconsIcon icon={InformationSquareFreeIcons} size={20} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 grow relative">
          {isLoading && (
            <div className="h-9 border border-gray-300 w-full rounded-lg animate-pulse bg-gray-700"></div>
          )}
          <Input
            id={name}
            name={name}
            type={type}
            defaultValue={DefaultValue}
            className={isLoading ? 'hidden' : blurActivated ? 'blur-xs' : ''}
            disabled={disabled}
            placeholder={
              placeholder ? placeholder : type === 'number' ? '0' : ''
            }
            onChange={(e) => onChange?.(e)}
            autoComplete="on"
          />
          {unit && (
            <span className="text-sm text-gray-400 font-mono">{unit}</span>
          )}
          {isBlur && (
            <button
              type="button"
              className="absolute right-2 text-xs text-gray-400 hover:text-gray-200 cursor-pointer"
              onClick={() => setBlurActivated((state) => !state)}
            >
              {blurActivated && <EyeClosedIcon size={20} />}
              {!blurActivated && (
                <HugeiconsIcon icon={EyeFreeIcons} size={20} />
              )}
            </button>
          )}
        </div>
        <AnimatePresence>
          {showHelp && (
            <motion.p
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="absolute top-6 left-0 text-xs text-gray-400  flex items-center gap-2 md:gap-4  bg-gray-700 rounded-sm px-3 py-2 my-1"
            >
              <HugeiconsIcon
                icon={InformationSquareFreeIcons}
                size={24}
                onClick={() => setShowHelp((state) => !state)}
                className="absolute cursor-pointer -top-5 md:-top-5 right-1.5  bg-gray-800 rounded-md "
              />
              <span>{helpText}</span>
            </motion.p>
          )}
        </AnimatePresence>
      </div>
      <div>
        {helpText && helpText.length > 0 && (
          <span className="hidden md:flex text-xs text-gray-400 mt-1 w-full items-center gap-2  tracking-wide">
            <div className="w-24"></div>
            <span className="w-full px-2.5 mx-auto flex items-start justify-start hyphens-auto text-gray-400 font-normal text-start gap-1 select-none">
              <HugeiconsIcon
                icon={InformationSquareFreeIcons}
                size={12}
                className="w-8 h-8  text-gray-600 flex-shrink-0"
              />
              {helpText}
            </span>
          </span>
        )}
        {error && error.length > 0 && (
          <span className="text-xs text-red-500 mt-1 flex items-end gap-2">
            <HugeiconsIcon icon={UserWarning01FreeIcons} size={18} />
            {error}
          </span>
        )}
      </div>
    </div>
  )
}
