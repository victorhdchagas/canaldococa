'use client'

import { Button } from '@/components/ui/button'
import { useNotification } from '@/hooks/useNotification'

export default function PushNotificationManager() {
  const { isSupported, isSubscribed, subscribeToNotifications } = useNotification()

  if (!isSupported) {
    return null // Don't show if not supported
  }

  return (
    <div className="fixed bottom-20 right-4 z-40">
      {!isSubscribed && (
        <Button
          onClick={subscribeToNotifications}
          size="sm"
          className="bg-primary hover:bg-primary/90"
        >
          🔔 Ativar Notificações
        </Button>
      )}
    </div>
  )
}