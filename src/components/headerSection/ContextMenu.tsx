'use client' // Use 'use client' para que o componente possa ter estado interativo

import {
  ArrowDown01FreeIcons,
  Logout01FreeIcons,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import { useState } from 'react'

export default function ContextMenu({ userAvatar }: { userAvatar: string }) {
  const [isOpen, setIsOpen] = useState(false) // Estado para controlar a visibilidade do menu

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)} // Alterna o estado ao clicar
      >
        <img
          src={userAvatar}
          alt="User Avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <HugeiconsIcon
          icon={ArrowDown01FreeIcons}
          size={24}
          className="text-yellow-500"
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10 transition-all duration-300 ease-in-out transform">
          <div className="py-1">
            <Link
              href="/profile"
              className="block px-4 py-2 text-sm text-yellow-500 hover:bg-gray-700"
              onClick={() => setIsOpen(false)} // Fecha o menu após o clique
            >
              Meu Perfil
            </Link>
            <Link
              href="/settings"
              className="block px-4 py-2 text-sm text-yellow-500 hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Configurações
            </Link>
            <hr className="border-gray-700 my-1" />
            <button
              onClick={() => {
                // Lógica para logout (ex: chamar uma API de logout)
                console.log('Logout...')
                setIsOpen(false)
              }}
              className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-700"
            >
              <HugeiconsIcon icon={Logout01FreeIcons} size={24} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
