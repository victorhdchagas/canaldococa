'use client'
import {
  ArrowUp01FreeIcons,
  InformationSquareFreeIcons,
  Settings02FreeIcons,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { AnimatePresence, motion, Variants } from 'framer-motion'
import { useRouter } from 'next/navigation'
import React from 'react'
import { twMerge } from 'tailwind-merge'
interface ConnectionCardProps {
  description: string
  effects: string[]
  name: string
  isConnected: boolean
}
export default function ConnectionCard(connection: ConnectionCardProps) {
  const router = useRouter()
  const [detailsVisible, setDetailsVisible] = React.useState(false)

  const ulVariants: Variants = {
    hidden: { height: 0, opacity: 0, marginTop: 0, marginBottom: 0 },
    visible: {
      height: 'auto',
      opacity: 1,
      marginTop: '0.5rem',

      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
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
  async function onConnect(type: string) {
    const url = new URL(window.location.origin)
    url.pathname = `/api/auth/${type.toLowerCase()}/connect`
    router.push(url.toString())
  }

  const showEffects = detailsVisible && connection.effects.length > 0
  return (
    <div
      className="flex flex-col  
            shadow-m
            bg-gray-800
             rounded-sm p-4 w-full"
    >
      <div className="flex justify-between items-center w-full">
        <h3 className="text-sm font-medium font-mono select-all first-letter:uppercase">
          {connection.name}
        </h3>
        <span
          className={`px-2 py-1 text-sm rounded-full font-mono ${
            connection.isConnected
              ? 'rounded-full h-4 w-4 bg-emerald-900 text-gray-200'
              : 'rounded-full h-4 w-4 bg-red-900 text-gray-200'
          }`}
        >
          {/* {connection.status === 'connected' ? 'Conectado' : 'Desconectado'} */}
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
            className="list-disc list-inside text-sm text-gray-300 mt-2 transition-all px-4 py-4 rounded-lg bg-gray-700"
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

      <div className="mt-4 grid grid-cols-2">
        <div></div>
        <div className="flex justify-end items-center gap-2">
          <button className="transition-all text-xs hover:shadow-m hover:text-gray-300 hover:from-gray-700 hover:scale-105 text-gray-400 bg-gradient-to-b from-gray-800 to-gray-900 shadow-s cursor-pointer py-1 px-1 rounded-md text-center">
            <HugeiconsIcon icon={InformationSquareFreeIcons} size={24} />
          </button>
          {connection.isConnected && (
            <button
              onClick={() => {
                router.push(`/account/admin/connections/${connection.name}`)
              }}
              className="transition-all text-xs hover:shadow-m hover:text-gray-300 hover:from-gray-700 hover:scale-105 text-gray-400 bg-gradient-to-b from-gray-800 to-gray-900 shadow-s cursor-pointer py-1 px-1 rounded-md text-center"
            >
              <HugeiconsIcon icon={Settings02FreeIcons} size={24} />
            </button>
          )}
          {connection.isConnected && (
            <button className="transition-all text-xs hover:shadow-m hover:text-gray-300 hover:from-gray-700 hover:scale-105 text-gray-400 bg-gradient-to-b from-gray-800 to-gray-900 shadow-s cursor-pointer py-2 px-1 w-24 rounded-md text-center">
              Desconectar
            </button>
          )}
          {!connection.isConnected && (
            <button
              onClick={() => onConnect(connection.name)}
              className="transition-all text-xs hover:shadow-m hover:text-gray-300 hover:from-gray-700 hover:scale-105 text-gray-400 bg-gradient-to-b from-gray-800 to-gray-900 shadow-s cursor-pointer py-2 px-1 w-24 rounded-md text-center"
            >
              Conectar
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
