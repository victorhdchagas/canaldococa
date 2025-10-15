'use client'
import { YoutubeFreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import React, { useState } from 'react'

export default function WelcomePopup() {
  const [isOpen, setIsOpen] = useState(true)

  function onClose() {
    setIsOpen(false) // Trigger exit animation
    // Delay URL update until animation completes
    setTimeout(() => {
      const searchParams = new URLSearchParams(window.location.search)
      searchParams.delete('welcome')
      const newRelativePathQuery =
        window.location.pathname + '?' + searchParams.toString()
      window.history.replaceState(null, '', newRelativePathQuery)
    }, 200)
  }

  // Animation variants for the dialog
  const dialogVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
    exit: {
      opacity: 0,
      y: 50,
      transition: { duration: 0.2, ease: 'easeIn' },
    },
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed w-full h-full inset-0 flex items-center justify-center bg-black/70 z-40 overflow-hidden">
          <motion.dialog
            open
            aria-labelledby="welcome-dialog-title"
            aria-describedby="welcome-dialog-description"
            className="bg-gradient-to-b from-gray-900 to-gray-950 select-none shadow-l p-4 flex flex-col justify-start max-w-md w-full rounded-t-md md:mx-auto"
            variants={dialogVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex flex-row items-center gap-4 pb-2">
              <div className="bg-gray-200 w-10 h-10 rounded-sm flex items-center justify-center">
                <HugeiconsIcon
                  icon={YoutubeFreeIcons}
                  className="h-12 w-12 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <h3
                id="welcome-dialog-title"
                className="text-gray-300 text-lg font-semibold text-shadow-sm font-mono"
              >
                Conexão com YouTube
              </h3>
            </div>
            <p
              id="welcome-dialog-description"
              className="text-sm text-gray-400 px-2"
            >
              Parabéns, sua conexão com YouTube foi feita, conheça os benefícios
            </p>

            <h4 className="text-gray-300 text-md font-semibold text-shadow-sm mt-2">
              Agora sua comunidade pode aproveitar:
            </h4>
            <ul
              className="list-disc list-inside text-sm text-gray-300 mt-2 transition-all px-4 py-4 rounded-lg bg-gray-700"
              aria-label="Benefícios da conexão com YouTube"
            >
              <li>Reconhecimento de mensagens feitas por usuários</li>
              <li>Aumentar acúmulo de XP por envio de mensagem</li>
              <li>Sincronização de cargos entre o servidor e a plataforma</li>
              <li>Notificações de eventos no servidor</li>
              <li>Acesso a canais exclusivos</li>
              <li>Entre outros...</li>
            </ul>
            <div className="mt-4 grid grid-cols-2">
              <div></div>
              <div className="flex justify-end items-center gap-2">
                <button
                  onClick={onClose}
                  className="transition-all text-sm hover:shadow-md hover:text-gray-300 hover:from-gray-700 hover:scale-105 text-gray-400 bg-gradient-to-b from-gray-800 to-gray-900 shadow-sm cursor-pointer py-1 px-2 rounded-md text-center"
                  aria-label="Fechar o diálogo de boas-vindas"
                >
                  Fechar
                </button>
              </div>
            </div>
          </motion.dialog>
        </div>
      )}
    </AnimatePresence>
  )
}
