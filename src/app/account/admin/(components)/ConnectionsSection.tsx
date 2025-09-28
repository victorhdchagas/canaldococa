import Subtitle from '@/components/text/subtitle'
import React from 'react'
import ConnectionCard from './ConnectionCard'

export default function ConnectionsSection() {
  const params = {
    title: 'Conexões',
    description: 'Gerencie suas conexões de conta com serviços externos.',
    connections: [
      {
        error: undefined,
        message: '',
        description: 'Responsável por hospedar e gerenciar vídeos.',
        effects: [],
        name: 'Youtube',
        status: 'connected',
      },
      {
        error: undefined,
        message: '',
        description: 'Integração de cargos, mensagens e notificações.',
        effects: [
          'Sobe de nivel ao vincular a conta.',
          'Recebe notificações de eventos.',
          'Acesso a canais exclusivos.',
          'Sincroniza cargos automaticamente.',
          'Permite login com Discord.',
          'Ganha xp ao interagir no servidor.',
        ],
        name: 'Discord',
        status: 'connected',
      },
      {
        error: undefined,
        message: '',
        description:
          'Responsável por processar pagamentos, cobranaças e produtos.',
        effects: [
          'Permite pagamentos recorrentes.',
          'Gerencia assinaturas e faturas.',
          'Oferece suporte a múltiplos métodos de pagamento.',
          'Facilita a integração com plataformas de e-commerce.',
          'Fornece ferramentas para prevenção de fraudes.',
          'Gera relatórios financeiros detalhados.',
        ],
        name: 'Stripe',
        status: 'disconnected',
      },
    ],
  }
  return (
    <div
      className=" border-yellow-700 bg-gradient-to-b from-gray-800 to-gray-950
      select-none
    flex flex-col justify-start max-w-md w-full rounded-t-md px-2"
    >
      <Subtitle>{params.title}</Subtitle>
      <p className="text-sm text-gray-500 px-2 pb-4">{params.description}</p>
      <div className="flex flex-col w-full gap-4 pb-4 px-2 ">
        {params.connections.map((connection) => (
          <ConnectionCard key={connection.name} {...connection} />
        ))}
      </div>
    </div>
  )
}
