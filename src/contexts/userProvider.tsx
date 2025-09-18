'use client'
import { PropsWithChildren, useEffect, useState } from 'react'
import { UserContext } from './userContext'
import { User } from '@/types/services'

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  useEffect(() => {
    async function getData() {
      setIsLoading(true)
      try {
        const response = await fetch('/api/user/getbycookie')
        const data = await response.json()
        setUser(data.user)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}
