'use client'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'
import { UserContext } from './userContext'
import { User } from '@/types/services'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function UserProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const hasShownSessionExpired = useRef(false)
  const router = useRouter()
  async function refresh() {
    setIsLoading(true)
    try {
      const response = await fetch('/api/user/getbycookie')
      const data = await response.json()
      setUser(data.user)
      if (!data.user && !hasShownSessionExpired.current) {
        hasShownSessionExpired.current = true
        toast.warning('Sua sessão está encerrada')
        router.push('/login') // Redireciona para a página de login
      }
    } catch (error) {
      console.error('Erro ao buscar usuário:', error)
      if (!hasShownSessionExpired.current) {
        hasShownSessionExpired.current = true
        toast.warning('Erro ao verificar sessão')
        router.push('/login')
      }
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    refresh()
  }, [router, refresh])

  return (
    <UserContext.Provider value={{ user, setUser, isLoading, refresh }}>
      {children}
    </UserContext.Provider>
  )
}
