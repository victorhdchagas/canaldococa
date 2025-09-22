'use client'
import React from 'react'
import { HugeiconsCoreFreeIcons } from '@hugeicons/react'
import { useRouter } from 'next/navigation'
import HeaderSection from '@/components/headerSection/headerSection'
import Link from 'next/link'

// Main component for the login page
const LoginPage = () => {
  const router = useRouter()

  const handleLogin = () => {
    const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${
      process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID
    }&redirect_uri=${encodeURIComponent(
      process.env.NEXT_PUBLIC_DISCORD_REDIRECT_URI || '',
    )}&response_type=code&scope=identify%20email`
    router.push(discordAuthUrl)
  }

  return (
    <div className="flex items-center justify-center flex-col min-h-screen bg-background text-foreground animate-fade-in p-4">
      <div className="relative w-full max-w-sm rounded-lg overflow-hidden shadow-2xl transition-all duration-300 transform hover:scale-105">
        {/* Background image from the original design */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://placehold.co/600x800/2A2A2A/FFD700?text=Background)',
          }}
        >
          {/* A semi-transparent overlay to make the content more readable */}
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        {/* Login content container */}
        <div className="relative z-10 flex flex-col items-center p-8 space-y-6 bg-card/80 backdrop-blur-md rounded-lg border border-border">
          <h1 className="text-3xl font-bold text-primary-foreground text-center">
            Bem-vindo(a) de volta!
          </h1>
          <p className="text-center text-muted-foreground">
            Entre para continuar.
          </p>

          {/* User input field */}
          <div className="w-full">
            <label htmlFor="username" className="sr-only">
              Nome de usuário
            </label>
            <input
              type="text"
              id="username"
              placeholder="Seu nome de usuário"
              className="w-full p-3 rounded-md bg-input text-foreground border border-border focus:ring-2 focus:ring-ring focus:outline-none transition-colors"
            />
          </div>

          {/* Discord login button */}
          <button
            onClick={() => {
              handleLogin()
            }}
            className="w-full flex items-center justify-center p-3 rounded-md bg-[#5865F2] text-white font-semibold transition-transform transform hover:scale-105 hover:bg-[#4E5AE2] focus:ring-4 focus:ring-[#5865F2]/50 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19.789 2.5a2.545 2.545 0 00-2.31 1.258 19.336 19.336 0 00-6.19 2.373A19.462 19.462 0 005.152 4.093a2.534 2.534 0 00-2.35 1.26A2.5 2.5 0 002.5 7.5c0 .35.158.683.44.9.468.358.977.674 1.48.972a.084.084 0 00.086 0c.2-.12.4-.24.6-.35a.144.144 0 00.038-.03c.532-.308 1.054-.627 1.574-.954A15.93 15.93 0 0112 5.253a15.95 15.95 0 014.734 2.973c.52.327 1.042.646 1.574.954a.144.144 0 00.038.03c.2.11.4.23.6.35a.084.084 0 00.086 0c.503-.298 1.012-.614 1.48-.972a.998.998 0 00.44-.9A2.5 2.5 0 0019.79 2.5zM12 7.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z" />
              <path
                fill="currentColor"
                d="M12 10a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm0 2.5a.833.833 0 110 1.666.833.833 0 010-1.666z"
              />
              <path
                fill="currentColor"
                d="M22.5 7.5a1.25 1.25 0 01-1.25 1.25h-1a.5.5 0 000 1H21.5a1.25 1.25 0 011.25 1.25v2.5a1.25 1.25 0 01-1.25 1.25h-1a.5.5 0 000 1H21.5a1.25 1.25 0 011.25 1.25v2.5a1.25 1.25 0 01-1.25 1.25H2.5a1.25 1.25 0 01-1.25-1.25v-2.5a1.25 1.25 0 011.25-1.25H3.5a.5.5 0 000-1H2.5a1.25 1.25 0 01-1.25-1.25v-2.5A1.25 1.25 0 012.5 7.5H3.5a.5.5 0 000-1H2.5a1.25 1.25 0 011.25-1.25h17.5a1.25 1.25 0 011.25 1.25V7.5zM2.5 7.5H22.5"
              />
            </svg>
            Entrar com Discord
          </button>
          <Link href="/">Voltar</Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
