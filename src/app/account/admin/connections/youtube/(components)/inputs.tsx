'use client'
// app/account/youtube/(components)/YoutubeSettingsForm.tsx
const Input = ({ ...props }) => (
  <input
    {...props}
    className="bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 rounded-sm p-2 text-sm focus:ring-yellow-500 w-full"
    min="0"
  />
)

import { InformationSquareFreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Label } from '@radix-ui/react-label'
import * as Switch from '@radix-ui/react-switch'
import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'

interface FormFieldProps {
  label: string
  name: string
  value: number | string
  onChange: (value: number) => void
  helpText: string
  type?: 'number' | 'text'
  unit?: string // Ex: "XP", "mensagens"
}

export function ConfigFormField({
  label,
  name,
  value,
  onChange,
  helpText,
  type = 'number',
  unit,
}: FormFieldProps) {
  const [showHelp, setShowHelp] = useState(false)

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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onChange(Number(e.target.value))
          }
          placeholder="0"
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
            className="absolute w-full top-6 left-0 text-xs text-gray-400  flex items-center gap-2 md:gap-4  bg-gray-700 rounded-sm px-3 py-2 my-1"
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

// --- Estrutura do Switch de Ativação ---
interface ConfigSwitchProps {
  label: string
  name: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  helpText: string
}

export function ConfigSwitch({
  label,
  name,
  checked,
  onCheckedChange,
  helpText,
}: ConfigSwitchProps) {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <div className="flex flex-col gap-1 w-full p-2 bg-gray-900 rounded-md relative ">
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

      <AnimatePresence>
        {showHelp && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="w-full absolute top-6 left-0 text-xs text-gray-400 z-10 flex items-center gap-2 md:gap-4  bg-gray-700 rounded-sm px-3 py-2 my-1"
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

      <Switch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="w-[42px] h-[25px] bg-gray-700 rounded-full relative shadow-inner focus:shadow-md focus:outline-none data-[state=checked]:bg-emerald-600"
        id={name}
      >
        <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-lg transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </Switch.Root>
    </div>
  )
}
