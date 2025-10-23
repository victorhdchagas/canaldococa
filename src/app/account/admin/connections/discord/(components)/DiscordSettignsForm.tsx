'use client'
// app/account/discord/(components)/DiscordSettingsForm.tsx

import {
  HotspotOfflineFreeIcons,
  InformationSquareFreeIcons,
  Wifi01FreeIcons,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Label } from '@radix-ui/react-label'
import * as Select from '@radix-ui/react-select' // Importação Radix Select
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react' // Ícones para o Select
import Link from 'next/link'
import { ComponentProps, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  ConfigFormField,
  ConfigSwitch,
} from '../../youtube/(components)/inputs'

const Button = ({
  children,
  className,
  ...props
}: ComponentProps<'button'>) => (
  <button
    {...props}
    className={twMerge(
      'transition-all text-xs hover:shadow-m hover:text-gray-300 hover:from-gray-700 hover:scale-[1.02] text-gray-400 bg-gradient-to-b from-gray-800 to-gray-900 shadow-s cursor-pointer py-2 px-4 rounded-md text-center font-mono',
      className,
    )}
  >
    {children}
  </button>
)

// --- Estruturas de Campos (Mantendo sua adaptação) ---

// Helpers para Field e Switch (usando as estruturas que você adaptou no componente Youtube)

// ... [Colocar aqui as funções ConfigFormField e ConfigSwitch que você forneceu]
// Para não repetir código, assuma que essas funções foram copiadas do seu código do YouTube

// --- Componente Customizado para o Select de Cargos ---

interface ConfigSelectProps {
  label: string
  name: string
  value: string
  onValueChange: (value: string) => void
  options: { value: string; label: string }[]
  helpText: string
}

function ConfigSelect({
  label,
  name,
  value,
  onValueChange,
  options,
  helpText,
}: ConfigSelectProps) {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <div className="flex flex-col gap-1 w-full p-2 bg-gray-900 rounded-md relative">
      <div className="flex justify-between items-center">
        <Label htmlFor={name} className="text-sm text-gray-300 font-mono">
          {label}
        </Label>
        <button
          onClick={() => setShowHelp((s) => !s)}
          className="transition-all text-gray-400 hover:text-yellow-500"
          type="button"
          aria-label={`Ajuda sobre ${label}`}
        >
          <HugeiconsIcon icon={InformationSquareFreeIcons} size={20} />
        </button>
      </div>

      <AnimatePresence>
        {showHelp && (
          <motion.p
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="absolute w-full top-6 left-0 text-xs text-gray-400  flex items-center gap-2 md:gap-4  bg-gray-700 rounded-sm px-3 py-2 my-1"
          >
            <HugeiconsIcon
              icon={InformationSquareFreeIcons}
              size={24}
              onClick={() => setShowHelp((state) => !state)}
              className="absolute cursor-pointer -top-5 md:-top-5 right-1.5  bg-gray-800 rounded-md "
            />
            <span>{helpText}</span>
          </motion.p>
        )}
      </AnimatePresence>

      <Select.Root value={value} onValueChange={onValueChange} name={name}>
        <Select.Trigger
          className="flex items-center justify-between bg-gray-800 border border-gray-700 text-gray-100 rounded-sm p-2 text-sm w-full focus:ring-yellow-500"
          aria-label={label}
        >
          <Select.Value placeholder="Selecione um Cargo..." />
          <Select.Icon className="text-gray-400">
            <ChevronDown size={16} />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="bg-gray-700 rounded-md shadow-lg overflow-hidden z-50">
            <Select.Viewport className="p-1">
              {options.map((option) => (
                <Select.Item
                  key={option.value}
                  value={option.value}
                  className="text-gray-200 text-sm p-2 rounded-sm cursor-pointer hover:bg-gray-600 flex items-center justify-between pr-8 relative"
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                  <Select.ItemIndicator className="absolute right-2 top-1/2 -translate-y-1/2">
                    <Check size={16} />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  )
}

// --- Componente Principal do Formulário ---
export default function DiscordSettingsForm() {
  // Dados simulados para o Select de Cargos
  const discordRoles = [
    { value: 'none', label: 'Nenhum Cargo' },
    { value: 'member_tier_1', label: '⭐ Membro Nível 1' },
    { value: 'member_tier_2', label: '🌟 Membro Nível 2' },
    { value: 'admin', label: '👑 Administrador' },
  ]

  // Estado para simular as configurações
  const [settings, setSettings] = useState({
    isConnected: true,
    roleSubscriberTier1: 'member_tier_1',
    xpPerSubscription: 500, // XP por subscriber na plataforma
    xpForVideoSuggestion: 15, // XP por comando de sugestão de vídeo
    xpPerCommand: 15, // XP por comando de sugestão de vídeo
    minMessagesDiscord: 1,
    botEnabled: true,
    welcomeChannelId: '#canal-de-boas-vindas',
  })

  const handleChange = (
    name: keyof typeof settings,
    value: number | string | boolean,
  ) => {
    setSettings((prev) => ({ ...prev, [name]: value as any }))
  }

  // Renderização Completa do Formulário
  return (
    <form className="flex flex-col gap-6 px-1 md:p-4 rounded-lg bg-gradient-to-b from-gray-900 to-gray-950  shadow-l w-full max-w-4xl mx-auto pb-4">
      {/* 1. Status da Conexão */}
      <section className="p-4 bg-gray-900 shadow-m rounded-md border border-gray-700 relative overflow-hidden">
        <h3 className="text-gray-300 text-lg font-semibold text-shadow-sm">
          Status da Conexão Discord
        </h3>
        <p className="text-xs text-gray-300 font-mono">
          Conexão com o Servidor:{' '}
          <span
            className={
              settings.isConnected ? 'text-yellow-500' : 'text-red-400'
            }
          >
            {settings.isConnected ? 'Ativa' : 'Desconectada'}
          </span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {settings.isConnected
            ? 'Seu Bot está online e gerenciando a comunidade.'
            : 'Conecte seu servidor para ativar as recompensas e sincronização de cargos.'}
        </p>
        <div className="mt-4 flex gap-2">
          {!settings.isConnected && (
            <Button className="bg-blue-600 hover:bg-blue-500 text-white font-bold">
              Conectar Servidor
            </Button>
          )}
          {settings.isConnected && (
            <Button className="transition-all hover:shadow-m hover:text-gray-300 hover:from-gray-700 hover:scale-105 text-gray-400 bg-gradient-to-b from-gray-800 to-gray-900 shadow-s cursor-pointer py-2 px-1 w-24 rounded-md text-center">
              Desvincular
            </Button>
          )}
          <HugeiconsIcon
            icon={
              settings.isConnected ? Wifi01FreeIcons : HotspotOfflineFreeIcons
            }
            size={96}
            className="absolute rotate-45 opacity-20 scale-125 top-8 right-6 md:top-10  md:right-10"
          />
        </div>
      </section>

      {/* 2. Sincronização e Mapeamento de Cargos */}
      <section className="p-4 bg-gray-900 shadow-m rounded-md border border-gray-700">
        <h3 className="text-lg font-bold text-gray-300 mb-4">
          Sincronização de Membros e Cargos
        </h3>

        <ConfigSelect
          label="Cargo para Assinantes Nível 1 (Plataforma)"
          name="roleSubscriberTier1"
          value={settings.roleSubscriberTier1}
          onValueChange={(val) => handleChange('roleSubscriberTier1', val)}
          options={discordRoles}
          helpText="Mapeia usuários que assinam o Nível 1 na sua plataforma para um cargo específico no Discord. O bot fará a sincronização automática."
        />

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <ConfigFormField
            label="Bônus de XP ao Assinar (Plataforma)"
            name="xpPerSubscription"
            value={settings.xpPerSubscription as number}
            onChange={(val) => handleChange('xpPerSubscription', val)}
            helpText="XP concedido de forma única quando um usuário completa uma assinatura Nível 1 ou superior na sua plataforma."
            unit="XP"
          />
          <ConfigFormField
            label="Canal de Boas-Vindas (ID ou Nome)"
            name="welcomeChannelId"
            value={settings.welcomeChannelId}
            onChange={(val) => handleChange('welcomeChannelId', val)}
            helpText="O canal onde o bot enviará mensagens de boas-vindas para novos membros que vincularam suas contas."
            type="text"
            unit=""
          />
        </div>
      </section>

      {/* 3. Regras de Recompensa de XP no Discord */}
      <section className="p-4 bg-gray-900 shadow-m rounded-md border border-gray-700">
        <h3 className="text-lg font-bold text-gray-300 mb-4">
          Recompensas de Atividade (XP)
        </h3>

        <ConfigSwitch
          label="Ativar Recompensas de XP no Discord"
          name="botEnabled"
          checked={settings.botEnabled as boolean}
          onCheckedChange={(checked) => handleChange('botEnabled', checked)}
          helpText="Liga/desliga a concessão de XP baseada em comandos e interações no Discord (XPCategory.DISCORD_ACTIVITY)."
        />

        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <ConfigFormField
            label="XP por Sugestão de Vídeo"
            name="xpForVideoSuggestion"
            value={settings.xpForVideoSuggestion as number}
            onChange={(val) => handleChange('xpForVideoSuggestion', val)}
            helpText="XP concedido quando um usuário usa o comando `/sugerir-video` ou similar no Discord. Incentiva a criação de conteúdo."
            unit="XP"
          />
          <ConfigFormField
            label="XP por Comando de Interação"
            name="xpPerCommand"
            value={10} // Valor simulado
            onChange={(val) => handleChange('xpPerCommand', val)}
            helpText="XP concedido por cada uso de um comando de interação customizado do bot (ex: /hug, /rank, /xp)."
            unit="XP"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <ConfigFormField
            label="Mensagens Mínimas/min no Discord"
            name="minMessagesDiscord"
            value={5} // Valor simulado
            onChange={(val) => handleChange('minMessagesDiscord', val)}
            helpText="Limite de quantas mensagens um usuário pode enviar por minuto para contabilizar o XP. Ajuda a evitar spam no chat."
            unit="mensagens/min"
          />
        </div>
      </section>

      {/* 4. Botões de Ação */}
      <div className="flex justify-end pt-4 gap-4 px-2">
        <Link
          href="/account/admin"
          className="transition-all hover:shadow-m hover:text-gray-300 hover:from-gray-700 hover:scale-105 text-gray-400 bg-gradient-to-b from-gray-800 to-gray-900 shadow-s cursor-pointer py-2 px-1 rounded-md text-center z-20"
        >
          Voltar
        </Link>
        <Button className="transition-all hover:shadow-m scale-105 hover:text-gray-300 hover:from-gray-700 hover:scale-110 text-gray-400 bg-gradient-to-b from-gray-800 to-gray-900 shadow-s cursor-pointer py-2 px-1 rounded-md text-center z-20">
          Salvar Configurações
        </Button>
      </div>
    </form>
  )
}
