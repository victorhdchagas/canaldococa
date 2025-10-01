'use client'
import { WEBSOCKET_URL } from '@/consts/urls'
import { useState, useEffect, useRef, useCallback } from 'react'

import { io, Socket } from 'socket.io-client'

export interface WebSocketMessage<T = unknown> {
  type: string
  payload: T
}

export const useWebSocket = <T = unknown>(
  eventToListen: string,
  onMessageReceived?: (message: WebSocketMessage<T>) => void,
  token?: string | null,
) => {
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const socketRef = useRef<Socket | null>(null)

  const sendMessage = useCallback((data: unknown) => {
    if (socketRef.current && socketRef.current.connected) {
      try {
        socketRef.current.emit('message', data)
      } catch (e) {
        console.error('Erro ao enviar mensagem via Socket.io:', e)
        setError('Erro ao enviar mensagem.')
      }
    } else {
      setError(
        'WebSocket não está conectado. Não foi possível enviar mensagem.',
      )
    }
  }, [])

  useEffect(() => {
    const url = new URL(WEBSOCKET_URL)

    const socket = io(url.origin, {
      path: url.pathname,
      transports: ['websocket', 'polling'],
      extraHeaders: {
        authorization: token ? `Bearer ${token}` : '',
      },

      reconnection: true,
      reconnectionAttempts: 5,
    })

    socketRef.current = socket

    socket.on('connect', () => {
      console.log('Socket.io conectado com sucesso.')
      setIsConnected(true)
      setError(null)
    })

    socket.on('disconnect', (reason) => {
      console.log('Socket.io desconectado:', reason)
      setIsConnected(false)
    })

    socket.on('connect_error', (err) => {
      console.error('Erro de conexão do Socket.io:', err.message)
      setError(`Erro de Conexão: ${err.message}`)
    })

    const listener = (data: any) => {
      try {
        if (onMessageReceived) {
          // Aqui esperamos que 'data' seja o objeto com 'type' e 'payload'
          onMessageReceived(data as WebSocketMessage<T>)
        }
      } catch (e) {
        console.error('Erro ao processar mensagem recebida:', e)
      }
    }
    socket.on(eventToListen, listener)

    // 4. Cleanup
    return () => {
      if (socketRef.current) {
        // 💡 Remove o listener ESPECÍFICO do evento antes de fechar o socket
        socketRef.current.off(eventToListen, listener)
        socketRef.current.disconnect()
      }
    }
  }, [onMessageReceived, token, eventToListen])

  return {
    isConnected,
    error,
    sendMessage,
  }
}
