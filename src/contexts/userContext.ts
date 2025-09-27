'use client'
import { User } from '@/types/services'
import { createContext } from 'react'

interface UserContextInterface {
  user: User | null
  setUser: (user: User | null) => void
  isLoading: boolean
  refresh: () => void
}

export const UserContext = createContext<UserContextInterface>({
  user: null,
  setUser: () => {},
  isLoading: false,
  refresh: () => {},
})
