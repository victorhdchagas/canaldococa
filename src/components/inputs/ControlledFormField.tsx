import { useState } from 'react'
import { Label } from '../ui/label'
import { HugeiconsIcon } from '@hugeicons/react'
import { InformationSquareFreeIcons } from '@hugeicons/core-free-icons'
import { Input } from '../ui/input'
import { AnimatePresence, motion } from 'framer-motion'

type InputType = 'number' | 'text'
export interface FormFieldProps<T extends InputType> {
  label: string
  name: string
  value: T extends 'number' ? number : string
  onChange: (value: T extends 'number' ? number : string) => void
  helpText: string
  type: T
  unit?: string // Ex: "XP", "mensagens"
  disabled?: boolean
  placeholder?: string
}

export function ControlledFormField<T extends InputType>({
  label,
  name,
  value,
  onChange,
  helpText,
  type,
  unit,
  disabled,
  placeholder,
}: FormFieldProps<T>) {
  const [showHelp, setShowHelp] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (type === 'number') {
      // Para number, converte o valor
      const numValue = e.target.value === '' ? 0 : Number(e.target.value)
      onChange(numValue as T extends 'number' ? number : string)
    } else {
      // Para text, mantém como string
      onChange(e.target.value as T extends 'number' ? number : string)
    }
  }
  return (
    <div className="flex flex-col gap-1 w-full p-2 bg-gray-900 rounded-md relative">
      <div className="flex justify-between items-center">
        <Label htmlFor={name} className="text-sm text-gray-300 font-mono">
          {label}
        </Label>
        <button
          onClick={() => setShowHelp((s) => !s)}
          className="transition-all text-gray-400 hover:text-yellow-500"
          type="button"
          aria-label={`Ajuda sobre ${label}`}
        >
          <HugeiconsIcon icon={InformationSquareFreeIcons} size={20} />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <Input
          id={name}
          type={type}
          value={value}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder ? placeholder : type === 'number' ? '0' : ''}
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
