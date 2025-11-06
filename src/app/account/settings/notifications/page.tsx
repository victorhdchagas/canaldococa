import Box from '@/components/boxes/box'

interface Notification {
  id: string
  viewed: boolean
  title?: string
  message: string
  createdAt: Date
  type: string
}

export default function NotificationPage() {
  function createNotification(
    viewed: boolean,
    message: string,
    title?: string,
    type?: string,
  ): Notification {
    return {
      id: '0',
      viewed,
      title,
      message,
      createdAt: new Date(),
      type: type || 'normal',
    }
  }
  let notifications = [
    createNotification(false, 'Bem vindo'),
    createNotification(true, 'Sua assinatura foi renovada', 'Guilda'),
    createNotification(true, 'A live começou'),
    createNotification(true, 'Matanza criou um novo CD'),
    createNotification(
      false,
      'Um outro login foi efetuado em sua conta',
      'Sistema',
      'system',
    ),
  ]

  notifications = notifications.map((n, i) => ({
    ...n,
    id: (i + 1).toString(),
  }))
  return (
    <Box title="Notificações" subtitle="Mensagens da plataforma e do streamer">
      <div className="flex flex-col gap-2">
        {notifications.map((notification) => (
          <div key={notification.id}>
            {notification.type === 'normal' && (
              <DefaultNotificationCard notification={notification} />
            )}
            {notification.type === 'system' && (
              <SystemNotificationCard notification={notification} />
            )}
          </div>
        ))}
      </div>
    </Box>
  )
}

function DefaultNotificationCard({
  notification,
}: {
  notification: {
    message: string
    title?: string
    viewed: boolean
    createdAt: Date
  }
}) {
  return (
    <div className="relative flex flex-col justify-center border border-gray-800 shadow-s rounded-lg p-2 bg-gradient-to-b from-gray-900 to-gray-950 ">
      {!notification.viewed && (
        <>
          <div className="h-4 w-4 animate-pulse absolute -top-1 -right-1 rounded-full bg-red-600"></div>
          <div className="h-3 w-3 absolute -top-0.5 -right-0.5 rounded-full bg-red-600"></div>
        </>
      )}
      {'title' in notification && (
        <span className="text-xs text-gray-600 font-mono">
          {notification.title}
        </span>
      )}
      <span className="text-gray-300">{notification.message}</span>
      <div className="flex justify-end">
        <span className="text-xs text-gray-600 font-mono">
          {notification.createdAt.toLocaleDateString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
          })}
        </span>
      </div>
    </div>
  )
}
function SystemNotificationCard({
  notification,
}: {
  notification: {
    message: string
    title?: string
    viewed: boolean
    createdAt: Date
  }
}) {
  return (
    <div className="relative flex flex-col justify-center border border-gray-800 shadow-s rounded-lg p-2 bg-gradient-to-b from-gray-900 to-gray-950 ">
      {!notification.viewed && (
        <>
          <div className="h-4 w-4 animate-pulse absolute -top-1 -right-1 rounded-full bg-red-600"></div>
          <div className="h-3 w-3 absolute -top-0.5 -right-0.5 rounded-full bg-red-600"></div>
        </>
      )}
      {'title' in notification && (
        <span className="text-xs text-red-800 font-mono">
          {notification.title}
        </span>
      )}
      <span className="text-red-300">{notification.message}</span>
      <div className="flex justify-end">
        <span className="text-xs text-red-800 font-mono">
          {notification.createdAt.toLocaleDateString('pt-BR', {
            timeZone: 'America/Sao_Paulo',
          })}
        </span>
      </div>
    </div>
  )
}
