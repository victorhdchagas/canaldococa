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

  return <button onClick={handleLogin}>Login com Discord</button>
}
