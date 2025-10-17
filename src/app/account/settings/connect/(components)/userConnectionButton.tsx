'use client'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export default function UserConnectionButton({
  platform,
}: {
  platform: string
}) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['user.connections.resources', platform],
    queryFn: async () => {
      const response = await fetch(`/api/user/connections/${platform}`)
      return response.json()
    },
  })

  return (
    <button
      className="transition-all text-xs hover:shadow-m hover:text-gray-300 hover:from-gray-700 hover:scale-105 text-gray-400 bg-gradient-to-b from-gray-800 to-gray-900 shadow-s cursor-pointer py-1 px-1 w-20 rounded-md text-center mt-2"
      disabled={isPending || isError}
    >
      {isError && <span>Error</span>}
      {isPending && <span>Loading...</span>}
      {!isPending && !isError && (
        <span>{data.connected ? 'Desvincular' : 'Vincular'}</span>
      )}
    </button>
  )
}
