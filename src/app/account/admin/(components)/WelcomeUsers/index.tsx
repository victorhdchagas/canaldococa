'use client'
import Subtitle from '@/components/text/subtitle'
import { SocketEvents } from '@/consts/socket-enums'
import { useWebSocket, WebSocketMessage } from '@/lib/useWebsocket'
import {
  FileNotFoundFreeIcons,
  UserAccountFreeIcons,
  UserAdd02FreeIcons,
  UserSwitchFreeIcons,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface EventItem {
  id: number
  name: string
  date: string
  avatar: string
  message: string
  type: 'joined-platform' | 'become-member'
}

const initialData: EventItem[] = []

type FilterType = 'all' | 'users' | 'members'

export default function WelcomeUser({
  token,
}: {
  token: string | undefined | null
}) {
  const [events, setEvents] = useState<EventItem[]>(initialData)
  const [filter, setFilter] = useState<FilterType>('all')

  const onMessageReceived = useCallback(
    (event: WebSocketMessage<EventItem>) => {
      try {
        // Garantindo que a data é um objeto JSON válido (como você já faz)
        const newEvent: EventItem = event.payload

        setEvents((prevEvents) => [newEvent, ...prevEvents].slice(0, 50))
      } catch (error) {
        console.error('Erro ao processar mensagem do WebSocket:', error)
      }
    },
    [],
  )

  const { isConnected, error, sendMessage } = useWebSocket<EventItem>(
    SocketEvents.ADMIN_EVENTS,
    onMessageReceived,
    token,
  )

  useEffect(() => {
    console.log(isConnected, error)
  }, [isConnected, error, sendMessage])

  const filteredEvents = useMemo(() => {
    switch (filter) {
      case 'users':
        return events.filter((event) => event.type === 'joined-platform')
      case 'members':
        return events.filter((event) => event.type === 'become-member')
      case 'all':
      default:
        return events
    }
  }, [events, filter])

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    } catch (e) {
      return 'Data Inválida'
    }
  }

  return (
    <div
      className="bg-gradient-to-b from-gray-900 to-gray-950
      select-none shadow-l p-4
    flex flex-col justify-start max-w-md w-full rounded-t-md "
    >
      <h3 className="text-gray-300 text-lg font-semibold text-shadow-sm  ">
        Eventos recentes
      </h3>
      <p className="text-sm text-gray-500 px-2 pb-4">
        Exibe novos usuários e novos apoiadores da plataforma
      </p>
      <div className="flex flex-row justify-start gap-2 px-2 ">
        {/* Botão Todos */}
        <span
          onClick={() => setFilter('all')}
          className={twMerge(
            'transition-all text-xs text-gray-400 bg-gradient-to-b from-gray-800 to-gray-900 shadow-s cursor-pointer py-2 px-1 rounded-md w-16 text-center ',
            filter === 'all' && 'from-gray-700 text-gray-300 font-semibold ',
          )}
        >
          Todos
        </span>
        {/* Botão Usuários */}
        <span
          onClick={() => setFilter('users')}
          className={twMerge(
            'transition-all text-xs text-gray-400 bg-gradient-to-b from-gray-800 to-gray-900 shadow-s cursor-pointer py-2 px-1 rounded-md w-16 text-center ',
            filter === 'users' && 'from-gray-700 text-gray-300 font-semibold ',
          )}
        >
          Usuarios
        </span>
        {/* Botão Membros */}
        <span
          onClick={() => setFilter('members')}
          className={twMerge(
            'transition-all text-xs text-gray-400 bg-gradient-to-b from-gray-800 to-gray-900 shadow-s cursor-pointer py-2 px-1 rounded-md w-16 text-center ',
            filter === 'members' &&
              'from-gray-700 text-gray-300 font-semibold ',
          )}
        >
          Membros
        </span>
      </div>
      <div className="flex flex-col w-full gap-4 px-2 overflow-auto h-80 backdrop-blur-md pb-6 mt-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-3 border-b border-gray-700 pb-2 
            shadow-m
            bg-gray-800
             rounded-md p-4 w-full "
          >
            <img
              src={event.avatar}
              alt={event.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col flex-3">
              <span className="text-sm font-medium">{event.name}</span>
              <span className="text-xs text-gray-500">{event.message}</span>
              <span className="text-xs text-gray-500">
                {/* Formata a data recebida como string */}
                {formatDate(event.date)}
              </span>
            </div>
            <div className="flex-1 flex justify-end ">
              {event.type === 'joined-platform' ? (
                <HugeiconsIcon
                  icon={UserAdd02FreeIcons}
                  size={24}
                  className="text-gray-300"
                />
              ) : event.type === 'become-member' ? (
                <HugeiconsIcon
                  icon={UserSwitchFreeIcons}
                  size={24}
                  className="text-gray-300"
                />
              ) : null}
            </div>
          </div>
        ))}
        {filteredEvents.length === 0 && (
          <div className="w-full flex justify-center flex-col items-center h-full">
            <HugeiconsIcon
              icon={FileNotFoundFreeIcons}
              className="w-16 h-16 text-gray-600"
            />
            <p className="text-center text-gray-600 mt-8">
              Nenhum evento encontrado para o filtro atual.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
