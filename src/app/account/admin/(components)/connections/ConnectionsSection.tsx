import React from 'react'
import ConnectionCard from './ConnectionCard'
import { serverEnv } from '@/env/server'
import { getToken } from '@/core/cookie.service'

export default async function ConnectionsSection() {
  const token = await getToken()
  const data = await fetch(`${serverEnv.API_URL}/admin/connections`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const connections = (await data.json()) as {
    description: string
    effects: string[]
    name: string
    type: string
    isConnected: boolean
  }[]
  const params = {
    title: 'Conexões',
    description: 'Gerencie suas conexões de conta com serviços externos.',
    connections,
    // connections: [
    //   {
    //     error: undefined,
    //     message: '',
    //     description: 'Responsável por hospedar e gerenciar vídeos.',
    //     effects: [],
    //     name: 'Youtube',
    //     status: 'disconnected',
    //   },
    //   {
    //     error: undefined,
    //     message: '',
    //     description: 'Integração de cargos, mensagens e notificações.',
    //     effects: [
    //       'Sobe de nivel ao vincular a conta.',
    //       'Recebe notificações de eventos.',
    //       'Acesso a canais exclusivos.',
    //       'Sincroniza cargos automaticamente.',
    //       'Permite login com Discord.',
    //       'Ganha xp ao interagir no servidor.',
    //     ],
    //     name: 'Discord',
    //     status: 'connected',
    //   },
    //   {
    //     error: undefined,
    //     message: '',
    //     description:
    //       'Responsável por processar pagamentos, cobranaças e produtos.',
    //     effects: [
    //       'Permite pagamentos recorrentes.',
    //       'Gerencia assinaturas e faturas.',
    //       'Oferece suporte a múltiplos métodos de pagamento.',
    //       'Facilita a integração com plataformas de e-commerce.',
    //       'Fornece ferramentas para prevenção de fraudes.',
    //       'Gera relatórios financeiros detalhados.',
    //     ],
    //     name: 'Stripe',
    //     status: 'disconnected',
    //   },
    // ],
  }
  return (
    <div
      className="bg-gradient-to-b from-gray-900 to-gray-950
      select-none shadow-l p-4
    flex flex-col justify-start max-w-md w-full rounded-t-md "
    >
      <h3 className="text-gray-300 text-lg font-semibold text-shadow-sm ">
        {params.title}
      </h3>
      <p className="text-sm text-gray-500 px-2 pb-4">{params.description}</p>
      <div className="flex flex-col w-full gap-4 pb-4 px-2 ">
        {params.connections.map((connection) => (
          <ConnectionCard key={connection.type} {...connection} />
        ))}
      </div>
    </div>
  )
}
