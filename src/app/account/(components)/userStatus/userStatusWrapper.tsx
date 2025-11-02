import UserStatus from './userStatus'

type UserStatusProps = {
  name: string
  progress: { level: number; currentXP: number; nextLevel: number }
  tags: string[]
  connections: {
    youtube: boolean
    discord: boolean
    kick: boolean
  }
}
export default async function UserStatusWrapper() {
  const userStatus: UserStatusProps = await new Promise((res) =>
    setTimeout(
      () =>
        res({
          name: 'wutachi',
          progress: { level: 3, currentXP: 300, nextLevel: 1200 },
          tags: ['Apoiador', 'Moderador'],
          connections: {
            youtube: true,
            discord: true,
            kick: false,
          },
        }),
      200,
    ),
  )
  return <UserStatus user={userStatus} />
}
