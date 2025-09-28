'use client'
import Subtitle from '@/components/text/subtitle'
import {
  BluetoothNotConnectedFreeIcons,
  FileNotFoundFreeIcons,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useEffect, useMemo, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface EventItem {
  id: number
  name: string
  date: string
  avatar: string
  message: string
  type: 'joined-platform' | 'become-member'
}

const initialData: EventItem[] = [
  //   {
  //     id: 1,
  //     name: 'Chris',
  //     date: new Date().toISOString(),
  //     avatar: `https://testingbot.com/free-online-tools/random-avatar/200?u=${Math.random()}`,
  //     message: 'Se cadastrou na plataforma!',
  //     type: 'joined-platform',
  //   },
  //   {
  //     id: 12,
  //     name: 'Leon',
  //     date: new Date().toISOString(),
  //     avatar: `https://testingbot.com/free-online-tools/random-avatar/200?u=${Math.random()}`,
  //     message: 'Se tornou membro Prata!',
  //     type: 'become-member',
  //   },
  //   {
  //     id: 16,
  //     name: 'Wesker',
  //     date: new Date().toISOString(),
  //     avatar: `https://testingbot.com/free-online-tools/random-avatar/200?u=${Math.random()}`,
  //     message: 'Se tornou membro Ouro!',
  //     type: 'become-member',
  //   },
]

type FilterType = 'all' | 'users' | 'members'

export default function WelcomeUser() {
  const [events, setEvents] = useState<EventItem[]>(initialData)
  const [filter, setFilter] = useState<FilterType>('all')

  useEffect(() => {
    const ws = new WebSocket('ws://localhost:8080/realtime-events')

    ws.onopen = () => {
      console.log('Conexão WebSocket estabelecida.')
    }

    ws.onmessage = (event) => {
      try {
        // Assume que a mensagem é uma string JSON contendo um EventItem
        const newEvent: EventItem = JSON.parse(event.data)

        setEvents((prevEvents) => [newEvent, ...prevEvents].slice(0, 50))
      } catch (error) {
        console.error('Erro ao processar mensagem do WebSocket:', error)
      }
    }

    ws.onerror = (error) => {
      console.error('Erro no WebSocket:', error)
    }

    return () => {
      ws.close()
      console.log('Conexão WebSocket fechada.')
    }
  }, [])

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
      className=" border-yellow-700 bg-gradient-to-b from-gray-800 to-gray-950 
          select-none
        flex flex-col justify-start max-w-md w-full rounded-md px-2 pb-6"
    >
      <Subtitle>Eventos recentes</Subtitle>
      <p className="text-sm text-gray-500 px-2 pb-4">
        Exibe novos usuários e novos apoiadores da plataforma
      </p>
      <div className="flex flex-row justify-evenly px-2 ">
        {/* Botão Todos */}
        <span
          onClick={() => setFilter('all')}
          className={twMerge(
            'transition-all text-xs text-gray-500 border border-yellow-700 cursor-pointer py-2 px-1 rounded-md ',
            filter === 'all' && 'bg-yellow-700 text-white ',
          )}
        >
          Todos
        </span>
        {/* Botão Usuários */}
        <span
          onClick={() => setFilter('users')}
          className={twMerge(
            'transition-all text-xs text-gray-500 border border-yellow-700 cursor-pointer py-2 px-1 rounded-md ',
            filter === 'users' && 'bg-yellow-700 text-white ',
          )}
        >
          Usuarios
        </span>
        {/* Botão Membros */}
        <span
          onClick={() => setFilter('members')}
          className={twMerge(
            'transition-all text-xs text-gray-500 border border-yellow-700 cursor-pointer py-2 px-1 rounded-md ',
            filter === 'members' && 'bg-yellow-700 text-white ',
          )}
        >
          Membros
        </span>
      </div>
      <div className="flex flex-col w-full gap-4 px-2 overflow-auto h-80 backdrop-blur-md pb-6 mt-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="flex items-center gap-3 border-b border-gray-700 pb-2 "
          >
            <img
              src={event.avatar}
              alt={event.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium">{event.name}</span>
              <span className="text-xs text-gray-500">{event.message}</span>
              <span className="text-xs text-gray-500">
                {/* Formata a data recebida como string */}
                {formatDate(event.date)}
              </span>
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
