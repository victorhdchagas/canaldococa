// components/RefreshHandler.tsx
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function RefreshHandler() {
  const router = useRouter()

  useEffect(() => {
    const refreshTokens = async () => {
      try {
        const response = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
        })

        if (response.ok) {
          router.refresh()
        } else {
          toast.error('Sessão', {
            description: 'Seu tempo de sessão encerrou.',
          })
          router.push('/login')
        }
      } catch (error) {
        console.error('Refresh error:', error)
        await fetch('/api/auth/logout', { method: 'POST' })
        router.push('/login')
      }
    }

    refreshTokens()
  }, [router])

  // Mostrar loading enquanto tenta refresh
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Atualizando sessão...</p>
      </div>
    </div>
  )
}
