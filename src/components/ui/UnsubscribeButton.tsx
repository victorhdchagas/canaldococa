'use client'

import { motion } from 'framer-motion'
import { BellOff } from 'lucide-react'
import { useNotification } from '@/hooks/useNotification'
import { cn } from '@/lib/utils'

interface UnsubscribeButtonProps {
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm' | 'lg'
  className?: string
}

export function UnsubscribeButton({
  variant = 'outline',
  size = 'sm',
  className,
}: UnsubscribeButtonProps) {
  const { isSupported, isSubscribed, unsubscribeFromNotifications } =
    useNotification()

  if (!isSupported || !isSubscribed) {
    return null
  }

  return (
    <motion.button
      onClick={unsubscribeFromNotifications}
      className={cn(
        'group flex items-center gap-2 px-2 py-1 rounded-md border border-border transition-colors hover:bg-background overflow-hidden cursor-pointer',
        className,
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <BellOff
        size={16}
        className="text-muted-foreground flex-shrink-0 ml-2 group-hover:ml-0"
      />

      <div className="flex items-center overflow-hidden max-w-0 group-hover:max-w-[200px] transition-all duration-300 ease-in-out">
        <span className="text-sm text-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity delay-100 duration-200 ml-2">
          Desativar Notificações
        </span>
      </div>
    </motion.button>
  )
}
