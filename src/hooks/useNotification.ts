import { useEffect, useState } from 'react'
import { toast } from 'sonner'

export function useNotification() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      checkSubscription()
    }
  }, [])

  const checkSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()
      setIsSubscribed(!!subscription)
    } catch (error) {
      console.error('Error checking subscription:', error)
    }
  }

  const subscribeToNotifications = async () => {
    try {
      const registration = await navigator.serviceWorker.ready

      // Request permission
      const permission = await Notification.requestPermission()
      if (permission !== 'granted') {
        toast.error('Permissão para notificações negada')
        return
      }

      // Subscribe
      const vapidKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY
      if (!vapidKey) {
        toast.error('Configuração de notificações incompleta')
        return
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(vapidKey)
      })

      // Send subscription to server
      const response = await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription)
      })

      if (!response.ok) {
        toast.error('Erro no servidor ao ativar notificações')
        return
      }

      setIsSubscribed(true)
      toast.success('Notificações ativadas! Você será notificado quando o live começar.')
    } catch (error) {
      console.error('Error subscribing:', error)
      toast.error('Erro ao ativar notificações')
    }
  }

  const unsubscribeFromNotifications = async () => {
    try {
      const registration = await navigator.serviceWorker.ready
      const subscription = await registration.pushManager.getSubscription()

      if (subscription) {
        await subscription.unsubscribe()
        await fetch(`/api/push/unsubscribe/${encodeURIComponent(subscription.endpoint)}`, {
          method: 'DELETE'
        })
      }

      setIsSubscribed(false)
      toast.success('Notificações desativadas.')
    } catch (error) {
      console.error('Error unsubscribing:', error)
      toast.error('Erro ao desativar notificações')
    }
  }

  return {
    isSubscribed,
    isSupported,
    subscribeToNotifications,
    unsubscribeFromNotifications,
    checkSubscription
  }
}

// Helper function to convert VAPID key
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }

  return outputArray
}