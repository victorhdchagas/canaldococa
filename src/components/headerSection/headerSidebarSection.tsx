'use client'
import { UserContext } from '@/contexts/userContext'
import Link from 'next/link'
import { PropsWithChildren, useContext } from 'react'
import LoginButton from '../LoginButton'
import ContextMenu from './ContextMenu'

export default function HeaderSidebarSection({ children }: PropsWithChildren) {
  const { user, isLoading } = useContext(UserContext)

  return (
    <header className="grid grid-cols-4  bg-gray-900 text-2xl font-bold text-black  items-center h-[4.25rem] md:container md:mx-auto  justify-center py-2 pr-4 md:pr-0">
      <div className="flex flex-row items-center justify-start gap-1 text-yellow-500 col-span-1 text-2xl">
        {children}
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
