'use client'
import { UserContext } from '@/contexts/userContext'
import Link from 'next/link'
import { useContext } from 'react'
import LoginButton from '../LoginButton'
import { SidebarTrigger } from '../ui/sidebar'
import ContextMenu from './ContextMenu'
import Image from 'next/image'

export default function HeaderSection() {
  const { user, isLoading } = useContext(UserContext)

  return (
    <div className="flex justify-start w-full mb-4">
      <header className="flex items-center flex-1 justify-end gap-8 bg-gray-900  text-black h-[4.25rem] md:container md:mx-auto py-2 px-4">
        <div className="text-gray-400 justify-self-start flex  items-center gap-2  mr-auto select-none">
          <SidebarTrigger className="" />
          <Link href="/" className="hidden md:block ">
            <Image
              src="/assets/coca_head.png"
              alt="logo"
              width={96}
              height={48}
              className="border-2 rounded-xl min-w-24 w-24 h-12 object-cover bg-destructive "
            />
          </Link>
          <span className="text-gray-200  transition-colors text-2xl font-bold">
            Canal do Coca
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-gray-300 font-semibold hover:border-b border-yellow-600 py-2  transition-colors"
          >
            Home
          </Link>
          {user && (
            <>
              <Link
                href="/account"
                className="text-gray-300 font-semibold hover:border-b border-yellow-600 py-2  transition-colors"
              >
                Conta
              </Link>
              <Link
                href="/account/settings"
                className="text-gray-300 font-semibold hover:border-b border-yellow-600 py-2  transition-colors"
              >
                Configurações
              </Link>
            </>
          )}
        </nav>
        <div className="flex items-center gap-4">
          {isLoading && (
            <div className="h-12 w-12 relative bg-red-900 rounded-full">
              <div className="h-12 w-12 top-0 left-0 animate-ping bg-red-950 -z-10 rounded-full"></div>
            </div>
          )}
          {!user && !isLoading && <LoginButton />}
          {user && !isLoading && (
            <ContextMenu
              userAvatar={user.avatar}
              role={user.role}
              username={user.username}
            />
          )}
        </div>
      </header>
    </div>
  )
}
