'use client'

import { useEffect } from 'react'

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/sw.js')
        .then(registration => {
          console.log('SW registered: ', registration)

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content available, notify user
                  if (confirm('Nova versão disponível! Recarregar página?')) {
                    window.location.reload()
                  }
                }
              })
            }
          })
        })
        .catch(error => {
          console.log('SW registration failed: ', error)
        })
    }
  }, [])

  return null
}