'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function DiscordCallback() {
  const router = useRouter()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get('code')

    if (code) {
      // Envia o código para o backend para obter o token
      axios
        .get(`http://localhost:3001/api/auth/discord/callback?code=${code}`, {
          withCredentials: true, // Se usar cookies para o token
        })
        .then((response) => {
          // Salve o token no localStorage ou em um contexto global
          localStorage.setItem('access_token', response.data.access_token)
          router.push('/dashboard') // Redireciona para a página desejada
        })
        .catch((error) => {
          console.error('Erro ao autenticar:', error)
          //   router.push('/login')
        })
    }
  }, [router])

  return <div>Autenticando...</div>
}
