'use client'
import { ControlledFormField } from '@/components/inputs/ControlledFormField'
// app/account/youtube/(components)/YoutubeSettingsForm.tsx

import {
  HotspotOfflineFreeIcons,
  InformationSquareFreeIcons,
  Wifi01FreeIcons,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Label } from '@radix-ui/react-label'
import * as Switch from '@radix-ui/react-switch'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { ComponentProps, useState } from 'react'
import { twMerge } from 'tailwind-merge'
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

// --- Estrutura do Switch de Ativação ---
interface ConfigSwitchProps {
  label: string
  name: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  helpText: string
}

function ConfigSwitch({
  label,
  name,
  checked,
  onCheckedChange,
  helpText,
}: ConfigSwitchProps) {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <div className="flex flex-col gap-1 w-full p-2 bg-gray-900 rounded-md relative ">
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
            className="w-full absolute top-6 left-0 text-xs text-gray-400 z-10 flex items-center gap-2 md:gap-4  bg-gray-700 rounded-sm px-3 py-2 my-1"
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

      <Switch.Root
        checked={checked}
        onCheckedChange={onCheckedChange}
        className="w-[42px] h-[25px] bg-gray-700 rounded-full relative shadow-inner focus:shadow-md focus:outline-none data-[state=checked]:bg-emerald-600"
        id={name}
      >
        <Switch.Thumb className="block w-[21px] h-[21px] bg-white rounded-full shadow-lg transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </Switch.Root>
    </div>
  )
}

interface YoutubeSettingsFormProps {
  xpPerMessage: number
  xpForNewMember: number
  xpPerSuperChat: number
  isEnabled: boolean
  showLevelUpOverlay: boolean
  isConnectionEnabled: boolean
}

export default function YoutubeSettingsForm(props: YoutubeSettingsFormProps) {
  const [settings, setSettings] = useState({
    xpPerMessageLive: props.xpPerMessage,
    xpPerMessageVideo: 1,
    xpPerSuperchat: props.xpPerSuperChat,
    xpPerNewMember: props.xpForNewMember,
    minMessages: 3,
    xpLimitPerMinute: 60,
    rewardsEnabled: props.isEnabled,
    channelSlug: 'canaldococa',
    showLevelUpOverlay: props.showLevelUpOverlay,
    isConnectionEnabled: props.isConnectionEnabled,
  })

  // Estado simulado de conexão
  const expiresAt = '2026-10-01'

  const handleChange = (
    name: keyof typeof settings,
    value: number | string | boolean,
  ) => {
    setSettings((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form className="flex flex-col gap-6 px-1 md:p-4 rounded-lg bg-gradient-to-b from-gray-900 to-gray-950  shadow-l w-full max-w-4xl mx-auto pb-4">
      {/* 1. Status da Conexão */}
      <section className="p-4 bg-gray-900 shadow-m rounded-md border border-gray-700 relative overflow-hidden">
        <h3 className="text-gray-300 text-lg font-semibold text-shadow-sm">
          Status da Conexão
        </h3>
        <p className="text-xs text-gray-300 font-mono">
          Conexão OAuth:{' '}
          <span
            className={
              settings.isConnectionEnabled ? 'text-yellow-500' : 'text-red-400'
            }
          >
            {settings.isConnectionEnabled ? 'Ativa' : 'Expirada'}
          </span>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          {settings.isConnectionEnabled
            ? `Expira em: ${expiresAt}`
            : 'Sua conexão expirou. As recompensas estão desativadas.'}
        </p>
        <div className="mt-4 flex gap-2">
          {!settings.isConnectionEnabled && (
            <Button className="bg-red-900 border-red-700">
              Renovar Conexão
            </Button>
          )}
          <Button className="transition-all hover:shadow-m hover:text-gray-300 hover:from-gray-700 hover:scale-105 text-gray-400 bg-gradient-to-b from-gray-800 to-gray-900 shadow-s cursor-pointer py-2 px-1 w-24 rounded-md text-center">
            Desvincular
          </Button>
          <HugeiconsIcon
            icon={
              settings.isConnectionEnabled
                ? Wifi01FreeIcons
                : HotspotOfflineFreeIcons
            }
            size={96}
            className="absolute rotate-45 opacity-20 scale-125 top-8 right-6 md:top-10  md:right-10"
          />
        </div>
      </section>

      {/* 2. Regras de Recompensa de XP */}
      <section className="p-4 bg-gray-900 shadow-m rounded-md border border-gray-700">
        <h3 className="text-lg font-bold text-gray-300 mb-4">
          Regras de Recompensa de XP
        </h3>

        <ConfigSwitch
          label="Ativar Recompensas de XP"
          name="rewardsEnabled"
          checked={settings.rewardsEnabled as boolean}
          onCheckedChange={(checked) => handleChange('rewardsEnabled', checked)}
          helpText="Liga ou desliga a concessão de XP para todas as interações do YouTube. Se desativado, o XP não será contabilizado."
        />

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <ControlledFormField
            label="XP por Mensagem na live"
            name="xpPerMessage"
            value={settings.xpPerMessageLive as number}
            onChange={(val) => handleChange('xpPerMessageLive', val)}
            helpText="XP concedido por cada mensagem única enviada no chat da live. Ajuste para balancear o engajamento."
            unit="XP"
          />
          <ControlledFormField
            label="XP por Membro Novo (Bônus)"
            name="xpPerNewMember"
            value={settings.xpPerNewMember as number}
            onChange={(val) => handleChange('xpPerNewMember', val)}
            helpText="Bônus único de XP ao se tornar um membro pago do canal (Subscriber)."
            unit="XP"
          />
          <ControlledFormField
            label="XP por Super Chat (por R$)"
            name="xpPerSuperchat"
            value={settings.xpPerSuperchat as number}
            onChange={(val) => handleChange('xpPerSuperchat', val)}
            helpText="XP concedido por cada unidade monetária (Real ou Dólar, dependendo da configuração) gasta em Super Chat."
            unit="XP / R$"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-1 w-full p-2 bg-gray-900 rounded-md relative">
            <div className="flex justify-between items-center">
              <Label
                htmlFor={'showLevelUpOverlay'}
                className="text-sm text-gray-300 font-mono"
              >
                Exibir na Live (Overlay)
              </Label>
            </div>

            <div className="flex items-center gap-2" id="showLevelUpOverlay">
              <button
                type="button"
                onClick={() =>
                  setSettings((state) => ({
                    ...state,
                    showLevelUpOverlay: !state.showLevelUpOverlay,
                  }))
                }
                className={twMerge(
                  'flex flex-col w-32 h-12 p-2 items-center bg-gradient-to-b  justify-center text-wrap text-md  text-shadow-lg text-center rounded-lg font-mono transition-all cursor-pointer ',
                  settings.showLevelUpOverlay
                    ? 'from-gray-800 to-gray-950 text-shadow-gray-400 shadow-l'
                    : 'from-gray-800 to-gray-950 shadow-m ',
                )}
              >
                {settings.showLevelUpOverlay ? 'Ligado' : 'Desligado'}
              </button>
            </div>
          </div>
        </div>
        <h4 className="text-md font-semibold text-gray-300 mt-6 mb-3 border-b border-gray-700 pb-1">
          Limites e Anti-Spam{' '}
          <span className="text-red-700 text-xs animate-pulse">
            Desabilitado
          </span>
        </h4>
        <div className="grid md:grid-cols-2 gap-4">
          <ControlledFormField
            disabled
            label="Mensagens Mínimas para XP"
            name="minMessages"
            value={settings.minMessages as number}
            onChange={(val) => handleChange('minMessages', val)}
            helpText="O número mínimo de mensagens que um usuário precisa enviar antes de começar a ganhar XP. Ajuda a evitar bots e spam."
            unit="mensagens"
          />
          <ControlledFormField
            disabled
            label="Limite de XP/Minuto"
            name="xpLimitPerMinute"
            value={settings.xpLimitPerMinute as number}
            onChange={(val) => handleChange('xpLimitPerMinute', val)}
            helpText="O teto máximo de XP que um usuário pode acumular em um minuto. Protege contra farm artificial de XP."
            unit="XP / min"
          />
        </div>
      </section>

      {/* 3. Configurações Gerais do Canal (Simulação de Channel Slug) */}
      <section className="p-4 bg-gray-900 rounded-md border border-gray-700">
        <h3 className="text-lg font-bold text-gray-300 mb-4 gap-2 flex items-center">
          Configurações Gerais
          <span className="text-red-700 text-xs animate-pulse">
            Desabilitado
          </span>
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <ControlledFormField
            label="URL Amigável da Comunidade (Slug)"
            name="channelSlug"
            value={settings.channelSlug as string}
            onChange={(val) => handleChange('channelSlug', val)}
            helpText="O identificador usado na URL da sua comunidade (Ex: canaldococa.com/c/SEU_SLUG). Deve ser único e amigável."
            type="text"
            unit=""
          />
        </div>
      </section>

      <div className="flex justify-end pt-4 gap-4 px-2">
        <Link
          href="/account/admin"
          className="transition-all hover:shadow-m hover:text-gray-300 hover:from-gray-700 hover:scale-105 text-gray-400 bg-gradient-to-b from-gray-800 to-gray-900 shadow-s cursor-pointer py-2 px-1 rounded-md text-center z-20"
        >
          Voltar
        </Link>
        <Button className="transition-all hover:shadow-m hover:text-gray-300 hover:from-gray-700 hover:scale-105 text-gray-400 bg-gradient-to-b from-gray-800 to-gray-900 shadow-s cursor-pointer py-2 px-1 rounded-md text-center z-20">
          Salvar Configurações
        </Button>
      </div>
    </form>
  )
}
