import { cookies } from 'next/headers'
import UserStatus from './userStatus'
import { clientEnv } from '@/env/client'
import { serverEnv } from '@/env/server'
import { isTokenValid } from '@/core/cookie.service'
import { dataTagErrorSymbol } from '@tanstack/react-query'

type UserStatusProps = {
  name: string
  avatar: string
  progress: { level: number; currentXP: number; nextLevel: number }
  tags: string[]
  connections: {
    youtube: boolean
    discord: boolean
    kick: boolean
  }
}
export default async function UserStatusWrapper() {
  const cookieStore = await cookies()
  const tokenCookie = cookieStore.get('token')
  if (!tokenCookie || !tokenCookie.value) return null
  const user = await isTokenValid(tokenCookie.value)
  if (!user) return null

  const [response, d] = await Promise.all([
    fetch(`${serverEnv.API_URL}/user/progression`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${tokenCookie.value}`,
      },
    }),
    fetch(`${serverEnv.API_URL}/user/calculate-tags`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${tokenCookie.value}`,
      },
    }),
  ])
  if (!response.ok) {
    return null
  }
  const progressionData = await response.json()
  const userStatus: UserStatusProps = progressionData
  return <UserStatus user={userStatus} />
}
