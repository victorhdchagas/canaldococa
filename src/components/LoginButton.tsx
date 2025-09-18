'use client'

import { Login02FreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
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
      className="text-lg font-bold font-mono p-2 px-2 bg-gray-950 text-yellow-500 border-[1px] rounded-full border-yellow-900 mr-2"
    >
      <HugeiconsIcon icon={Login02FreeIcons} size={24}></HugeiconsIcon>
    </button>
  )
}
