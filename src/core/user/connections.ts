import { ConnectionPlatformTypes } from '@/app/account/settings/connect/(components)/userconnectionCard'
import { getToken } from '../cookie.service'
import { serverEnv } from '@/env/server'
import { authFetch } from '@/lib/auth-fetch'
import { serverApiFetch } from '@/lib/server-api-client'

export async function getUserConnections(
  platform: string,
): Promise<
  Record<ConnectionPlatformTypes, { connected: boolean; resources: string[] }>
> {
  const response = await serverApiFetch(
    `${serverEnv.API_URL}/user/me/${platform}`,
  )
  return await response.json()
}
