import Link from 'next/link'
import React, { PropsWithChildren } from 'react'
import { UrlObject } from 'url'
export default function BoxLink({
  href,
  children,
}: PropsWithChildren<{ href: string | UrlObject }>) {
  return (
    <Link
      className="w-full text-lg rounded-sm border bg-gradient-to-b from-gray-950 to-gray-900 border-yellow-800 text-yellow-500 
      flex justify-center items-center font-bold p-4 hover:scale-105 shadow-md hover:shadow-lg shadow-amber-950 
      transition-all hover:-rotate-2 hover:text-2xl"
      href={href}
    >
      {children}
    </Link>
  )
}
