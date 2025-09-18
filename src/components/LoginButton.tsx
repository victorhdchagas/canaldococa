'use client'

import { useRouter } from 'next/navigation'

export default function LoginButton() {
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
    <button
      onClick={handleLogin}
      className="text-lg font-bold font-mono p-1 px-2 text-yellow-500 border-r-2 border-b-2 border-amber-600 rounded-2xl mr-2"
    >
      Login
    </button>
  )
}
