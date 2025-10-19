import { ChangeEvent, useState } from 'react'
import { Label } from '../ui/label'
import { HugeiconsIcon } from '@hugeicons/react'
import { InformationSquareFreeIcons } from '@hugeicons/core-free-icons'
import { Input } from '../ui/input'
import { AnimatePresence, motion } from 'framer-motion'

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
  onChange,
}: FormFieldProps<T>) {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <div className="flex flex-col gap-1 w-full p-2 bg-gray-900 rounded-md relative">
      <div className="flex justify-between items-center">
        <Label htmlFor={name} className="text-sm text-gray-300 font-mono">
          {label}
        </Label>
        {helpText && helpText.length > 0 && (
          <button
            onClick={() => setShowHelp((s) => !s)}
            className="transition-all text-gray-400 hover:text-yellow-500"
            type="button"
            aria-label={`Ajuda sobre ${label}`}
          >
            <HugeiconsIcon icon={InformationSquareFreeIcons} size={20} />
          </button>
        )}
      </div>

      <div className="flex items-center gap-2">
        {isLoading && (
          <div className="h-9 border border-gray-300 w-full rounded-lg animate-pulse bg-gray-700"></div>
        )}
        <Input
          id={name}
          name={name}
          type={type}
          defaultValue={DefaultValue}
          className={isLoading ? 'hidden' : ''}
          disabled={disabled}
          placeholder={placeholder ? placeholder : type === 'number' ? '0' : ''}
          onChange={(e) => onChange?.(e)}
        />
        {unit && (
          <span className="text-sm text-gray-400 font-mono">{unit}</span>
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
  )
}
