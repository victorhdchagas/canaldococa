import { ConnectionPlatformTypes } from '@/app/account/settings/connect/(components)/userconnectionCard'
import { getToken } from '../cookie.service'

export async function getUserConnections(): Promise<
  Record<ConnectionPlatformTypes, { connected: boolean; resources: string[] }>
> {
  const token = await getToken()
  await new Promise((resolve) => setTimeout(resolve, 1000))
  return {
    youtube: {
      connected: true,
      resources: [
        'Ganhe experiência com mensagens',
        'Ganhe experiência com SuperChat',
      ],
    },
    discord: {
      connected: true,
      resources: [
        'Ganhe experiência com mensagens',
        'Ganhe experiência com SuperChat',
      ],
    },
    kick: {
      connected: false,
      resources: [
        'Ganhe experiência com mensagens',
        'Ganhe experiência com SuperChat',
      ],
    },
  }
}
