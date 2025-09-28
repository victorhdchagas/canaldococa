'use client'
import { ArrowUp01FreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { motion, AnimatePresence, Variants } from 'framer-motion'
interface ConnectionCardProps {
  error: undefined
  message: string
  description: string
  effects: string[]
  name: string
  status: string
}
export default function ConnectionCard(connection: ConnectionCardProps) {
  const [detailsVisible, setDetailsVisible] = React.useState(false)

  const ulVariants: Variants = {
    // Estado inicial (fechado)
    hidden: { height: 0, opacity: 0, marginTop: 0, marginBottom: 0 },
    // Estado visível (aberto)
    visible: {
      height: 'auto', // O Framer Motion consegue animar isso de forma suave!
      opacity: 1,
      marginTop: '0.5rem',

      transition: {
        duration: 0.3, // Duração da animação
        ease: 'easeInOut',
      },
    },
    // Estado de saída
    exit: {
      height: 0,
      opacity: 0,
      marginTop: 0,
      marginBottom: 0,
      transition: {
        duration: 0.2,
        ease: 'easeInOut',
      },
    },
  }

  const showEffects = detailsVisible && connection.effects.length > 0
  return (
    <div
      key={connection.name}
      className="flex flex-col  border-gray-700 
            bg-gray-800
             rounded-md p-4 w-full"
    >
      <div className="flex justify-between items-center w-full">
        <h3 className="text-sm font-medium font-mono select-all">
          {connection.name}
        </h3>
        <span
          className={`px-2 py-1 text-sm rounded-full font-mono ${
            connection.status === 'connected'
              ? 'border-l-0 border-b border-emerald-900 text-gray-200'
              : 'border-l-0 border-b border-red-900 text-gray-200'
          }`}
        >
          {connection.status === 'connected' ? 'Conectado' : 'Desconectado'}
        </span>
      </div>
      <p className="text-xs text-gray-400 mt-2 select-all">
        {connection.description}
      </p>
      <AnimatePresence>
        {showEffects && (
          <motion.ul
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{ ...ulVariants }}
            className="list-disc list-inside text-sm text-gray-300 mt-2 transition-all"
          >
            {connection.effects.map((effect, index) => (
              <li key={index}>{effect}</li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      {connection.effects.length > 0 && (
        <span
          onClick={() => setDetailsVisible((state) => !state)}
          className="text-muted-foreground mt-2 text-sm flex items-center gap-1 cursor-pointer select-none hover:underline"
        >
          {detailsVisible ? 'Ocultar detalhes' : 'Ver detalhes'}{' '}
          <HugeiconsIcon
            icon={ArrowUp01FreeIcons}
            size={16}
            className={twMerge(
              'transition-all',
              detailsVisible ? '' : 'rotate-180',
            )}
          />
        </span>
      )}
      {connection.error && (
        <p className="text-sm text-red-500 mt-2">Erro: {connection.error}</p>
      )}
      {connection.message && (
        <p className="text-sm text-yellow-500 mt-2">{connection.message}</p>
      )}
      <div className="mt-4 items-end flex justify-end w-full">
        {connection.status === 'connected' ? (
          <button className="border cursor-pointer transition-all hover:bg-red-900 border-red-800 hover:border-red-700 font-light text-white px-2 py-1 rounded-md text-sm">
            Desconectar
          </button>
        ) : (
          <button className="border cursor-pointer transition-all hover:bg-green-900 border-green-800 hover:border-green-700 font-light text-white px-2 py-1 rounded-md text-sm">
            Conectar
          </button>
        )}
      </div>
    </div>
  )
}
