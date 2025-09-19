'use client'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { useCallback } from 'react'

export default function SearchUserFilter() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) params.set(name, value)
      else params.delete(name)

      return params.toString()
    },
    [searchParams],
  )
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const query = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    )
    router.push(
      `${pathname}?${createQueryString('query', query.query as string)}`,
    )
  }
  return (
    <form
      className="container mx-auto flex flex-col justify-start items-start gap-2 px-2"
      onSubmit={handleSubmit}
    >
      <span>Filtro de usuários</span>
      <div className="flex flex-row justify-between w-full gap-2">
        <input
          type="text"
          name="query"
          className="border border-yellow-600 rounded-lg w-full px-2"
          defaultValue={searchParams.get('query') || ''}
        />
        <button type="submit">Buscar</button>
      </div>
    </form>
  )
}
