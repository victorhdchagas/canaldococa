'use client'
import { UserContext } from '@/contexts/userContext'
import Link from 'next/link'
import Image from 'next/image'
import { useContext } from 'react'
import LoginButton from '../LoginButton'
import ContextMenu from './ContextMenu'

export default function HeaderSection() {
  const { user, isLoading } = useContext(UserContext)

  return (
    <header className="grid grid-cols-4 bg-background text-2xl font-bold text-foreground items-center h-16 md:container md:mx-auto justify-center py-4">
      <div className="flex flex-row items-center justify-start gap-1 text-yellow-500 col-span-1 text-2xl">
        <Link href="/">
            <Image
              src="/assets/coca_head.png"
              alt="logo"
              width={96}
              height={48}
              className="border-2 rounded-xl min-w-24 w-24 h-12 object-cover bg-destructive"
            />
        </Link>
        <span className="ml-2 hidden md:block text-nowrap">Canal do Coca</span>
      </div>
      <div className="flex justify-end col-span-3 items-end">
        {isLoading && (
          <div className="h-12 w-12  relative bg-red-900 rounded-full">
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
  )
}
