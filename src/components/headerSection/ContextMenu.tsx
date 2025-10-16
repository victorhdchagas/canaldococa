'use client' // Use 'use client' para que o componente possa ter estado interativo

import URL_PATHS from '@/consts/permissions'
import { useLogout } from '@/lib/use-logout'
import {
  ArrowDown01FreeIcons,
  Logout01FreeIcons,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Avatar, AvatarFallback } from '../ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { twMerge } from 'tailwind-merge'

export default function ContextMenu({
  userAvatar,
  role,
  username,
}: {
  userAvatar: string
  role: string
  username: string
}) {
  const { logout } = useLogout()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <div
        className="flex items-center gap-2 cursor-pointer relative mr-4 md:mr-0"
        onClick={() => setIsOpen(!isOpen)} // Alterna o estado ao clicar
      >
        <Avatar className="w-12 h-12">
          <AvatarImage src={userAvatar} />
          <AvatarFallback>{username[0] + username[1]}</AvatarFallback>
        </Avatar>

        <HugeiconsIcon
          icon={ArrowDown01FreeIcons}
          size={24}
          className={twMerge(
            'text-yellow-500 absolute -right-2 -bottom-1 bg-gray-800 rounded-full h-5 w-5 transition-all',
            isOpen ? 'rotate-180' : '',
          )}
        />
      </div>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10 transition-all duration-300 ease-in-out transform">
          <div className="py-1">
            {role === 'ADMIN' &&
              URL_PATHS.get(role)?.map((role) => (
                <Link
                  key={role[0]}
                  href={role[1]}
                  className="block px-4 py-2 text-sm text-yellow-500 hover:bg-gray-700"
                  onClick={() => setIsOpen(false)}
                >
                  {role[0]}
                </Link>
              ))}
            <Link
              href="/account"
              className="block px-4 py-2 text-sm text-yellow-500 hover:bg-gray-700"
              onClick={() => setIsOpen(false)} // Fecha o menu após o clique
            >
              Meu Perfil
            </Link>
            <Link
              href="/account/settings"
              className="block px-4 py-2 text-sm text-yellow-500 hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              Configurações
            </Link>
            <hr className="border-gray-700 my-1" />
            <button
              onClick={() => {
                setIsOpen(false)
                logout()
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
