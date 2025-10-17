'use client'
import { ArrowDown01FreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { twMerge } from 'tailwind-merge'

export default function ResourcesList({ platform }: { platform: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['user.connections.resources', platform],
    queryFn: async () => {
      const response = await fetch(`/api/user/connections/${platform}`)
      return response.json()
    },
  })

  if (isPending) return <div className="h-12">Loading...</div>
  if (isError) return <div>Error: {error.message}</div>
  return (
    <>
      <div className={twMerge('w-full flex justify-between ')}>
        <span className="text-xs text-gray-600 font-mono">Recursos</span>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="transition-all text-gray-400 hover:text-yellow-500 bg-gray-800 rounded-full h-5 w-8 flex items-center justify-center"
        >
          <HugeiconsIcon
            icon={ArrowDown01FreeIcons}
            size={24}
            className={twMerge(
              'text-yellow-500 transition-all',
              isOpen ? 'rotate-180' : '',
            )}
          />
        </button>
      </div>
      {isOpen && (
        <ul>
          {data.resources.map((resource: string) => (
            <li key={resource} className="text-xs text-gray-500">
              {resource}
            </li>
          ))}
        </ul>
      )}
      {!isOpen && (
        <div className="flex flex-col text-xs text-gray-500">
          <span>{data.resources[0]}</span>
          <span>E outras {data.resources.length - 1} vantagens</span>
        </div>
      )}
    </>
  )
}
