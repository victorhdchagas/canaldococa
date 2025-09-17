import Link from 'next/link'
import React from 'react'

export default function HeaderSection() {
  return (
    <header className="grid grid-cols-2  bg-gray-900 text-2xl font-bold text-black  items-center h-[4.25rem] md:container md:mx-auto">
      <img
        src="https://placehold.co/128x64/yellow/black"
        className="border-2 rounded-xl w-auto h-auto object-contain"
      />
      <div className="flex justify-end">
        <Link
          className="text-lg font-bold font-mono p-1 px-2 text-yellow-500 border-r-2 border-b-2 border-amber-600 rounded-2xl mr-2"
          href="/login"
        >
          Login
        </Link>
      </div>
    </header>
  )
}
