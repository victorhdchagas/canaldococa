'use client'

import React, { useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

export default function SelectAudioSettings({
  defaultValue,
  datasource,
}: {
  defaultValue: string
  datasource: string[]
}) {
  const [selectedAudioUrl, setSelectedAudioUrl] = useState(defaultValue)
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null,
  )

  const handlePlay = () => {
    // Para a reprodução de qualquer áudio anterior
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
    }

    if (selectedAudioUrl) {
      // Cria e reproduz o novo áudio usando a URL do proxy
      const newAudio = new Audio(
        `/api/admin/overlay/settings/audios/proxy?url=${encodeURIComponent(
          selectedAudioUrl,
        )}`,
      )
      newAudio.crossOrigin = 'anonymous'

      newAudio
        .play()
        .then(() => {
          // A reprodução começou, atualiza o estado
          setCurrentAudio(newAudio)
        })
        .catch((error) => {
          // Ignora o AbortError, que é comum quando o play é interrompido
          if (error.name !== 'AbortError') {
            console.error('Falha ao reproduzir o áudio:', error)
          }
        })

      // Armazena a nova instância de áudio para que possamos controlá-la depois
      setCurrentAudio(newAudio)
    }
  }

  const handleStop = () => {
    if (currentAudio) {
      currentAudio.pause()
      currentAudio.currentTime = 0
    }
  }

  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <Select
        defaultValue={defaultValue}
        name="audio"
        onValueChange={(value) => setSelectedAudioUrl(value)}
      >
        <SelectTrigger className="w-full md:w-full">
          <SelectValue placeholder="Selecione o áudio" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Áudios</SelectLabel>
            {datasource.map((value, key) => (
              <SelectItem value={value} key={key}>
                {value.split('/').pop()}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="flex gap-2">
        <Button onClick={handlePlay} disabled={!selectedAudioUrl} type="button">
          Reproduzir
        </Button>
        <Button onClick={handleStop} disabled={!currentAudio} type="button">
          Parar
        </Button>
      </div>
    </div>
  )
}
