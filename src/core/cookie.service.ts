import { User } from '@/types/services'
import { cookies } from 'next/headers'

export async function getUser(): Promise<User> {
  const cookieStore = await cookies()
  const userString = cookieStore.get('user')
  if (!!userString && 'value' in userString) {
    const user = JSON.parse(userString.value)

    return { ...user, createdAt: new Date(user.createdAt) }
  }
  throw new Error('User unauthorized')
}
