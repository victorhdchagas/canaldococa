import UserStatus from './userStatus'

export default async function UserStatusWrapper() {
  const userStatus = await new Promise((res) =>
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
      4000,
    ),
  )
  return <UserStatus user={userStatus} />
}
