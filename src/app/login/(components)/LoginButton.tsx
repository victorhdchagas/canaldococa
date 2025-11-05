'use client'
import { UserContext } from '@/contexts/userContext'
import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'

const ButtonVariants = cva(
  'w-full flex items-center justify-center p-3 rounded-md  text-white font-semibold transition-transform transform cursor-pointer hover:border-2 hover:border-card/50 focus:ring-4 focus:ring-[#5865F2]/50 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100',
  {
    variants: {
      variant: {
        discord:
          'border-transparent bg-[#5865F2] hover:bg-[#4E5AE2] focus-visible:ring-[#5865F2]/50',
        youtube: 'bg-white text-red-500 ',
        kick: 'text-green-400 bg-black',
      },
    },
    defaultVariants: {
      variant: 'discord',
    },
  },
)
export default function LoginButton({
  variant,
  children,
  className,
}: React.ComponentProps<'button'> & VariantProps<typeof ButtonVariants>) {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const ctx = useContext(UserContext)

  const handleLogin = async () => {
    setIsLoading(true)

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()

        if (data.success) {
          ctx.refresh()
          router.push(data.redirectUrl || '/account')
          return
        }
      }

      // Se chegou até aqui, a renovação falhou
      // Pega a URL de autorização da resposta da API ou constrói uma nova
      const loginData = await response.json()
      const discordAuthUrl = loginData.authUrl

      // Redireciona para o OAuth do Discord
      window.location.href = discordAuthUrl
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error)
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <button
      onClick={handleLogin}
      disabled={isLoading}
      className={cn(ButtonVariants({ variant }), className)}
    >
      {isLoading && 'Entrando...'}
      {!isLoading && children}
    </button>
  )
}
