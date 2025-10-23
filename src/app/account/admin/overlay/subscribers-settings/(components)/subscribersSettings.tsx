'use client'
import ErrorBox from '@/components/boxes/errorBox'
import LoadingBox from '@/components/boxes/loadingBox'
import BoxButton from '@/components/buttons/boxButton'
import SubmitButton from '@/components/buttons/submitbutton'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import {
  getOverlayAudios,
  getOverlayImages,
  getOverlaySettings,
  testOverlay,
  updateOverlaySettings,
} from '@/core/admin/clientOverlay.service'
import { useMutation, useQueries, useQueryClient } from '@tanstack/react-query'
import { useCallback, useState } from 'react'
import { toast } from 'sonner'
import SelectAudioSettings from './selectAudioSettings'
import SelectImagesSettings from './selectImagesSettings'

interface SubscriberSettingsProps {
  duration: number
  enabled: boolean
  internalName: string
  position: string
  sound: string
  image: string
}
export default function SubscribersSettings() {
  const queryClient = useQueryClient()
  const [duration, setDuration] = useState(0)

  const results = useQueries({
    queries: [
      {
        queryKey: ['admin.overlay.settings', 'subscribers'],
        queryFn: () =>
          getOverlaySettings('subscribers-settings').then((ret) => {
            setDuration(ret.properties.duration / 1000)
            return ret
          }),
      },
      {
        queryKey: ['admin.audio.urls'],
        queryFn: () => getOverlayAudios(),
      },
      {
        queryKey: ['admin.image.urls'],
        queryFn: () => getOverlayImages(),
      },
    ],
  })

  // Destruturando os resultados para cada consulta
  const [
    {
      data: settingsData,
      isPending: isPendingSettings,
      isError: isErrorSettings,
      error: settingsError,
    },
    {
      data: audioUrls,
      isPending: isPendingAudio,
      isError: isErrorAudio,
      error: audioError,
    },
    {
      data: imageUrls,
      isPending: isPendingImages,
      isError: isErrorImages,
      error: imagesError,
    },
  ] = results
  const [isEnabled, setIsEnabled] = useState(false)

  const handleTestClick = useCallback(() => {
    if (settingsData?.internalName)
      testOverlay(settingsData.internalName)
        .then(() => {
          toast('Teste enviado com sucesso')
        })
        .catch((err) => toast(err.message))
  }, [settingsData?.internalName]) // A função só será recriada se settingsData.id mudar

  const mutation = useMutation({
    mutationFn: updateOverlaySettings,
    onSuccess: () => {
      // Invalide o cache para rebuscar as configurações mais recentes
      queryClient.invalidateQueries({
        queryKey: ['admin.overlay.settings', 'subscribers'],
      })
      toast.success('Atualização', { description: 'Overlay atualizado' })
    },
    onError: (error) => {
      // Se a mutação falhar, reverta o estado do switch
      setIsEnabled(!isEnabled)
      console.error('Falha ao atualizar o switch:', error)
    },
  })

  const handleSwitchChange = useCallback(
    (checked: boolean) => {
      setIsEnabled(checked)

      mutation.mutate({ ...settingsData!, enabled: checked ? 'on' : 'off' })
    },
    [settingsData, mutation],
  )

  const isPending = isPendingSettings || isPendingAudio || isPendingImages
  const isError = isErrorSettings || isErrorAudio || isErrorImages

  if (isPending) {
    return (
      <section className="gap-4 px-2 container mx-auto w-full md:max-w-[400px]">
        <LoadingBox />
      </section>
    )
  }

  if (isError) {
    const errorMessage =
      settingsError?.message || audioError?.message || imagesError?.message
    return (
      <section className="gap-4 px-2 container mx-auto w-full md:max-w-[400px]">
        <ErrorBox>{errorMessage}</ErrorBox>
      </section>
    )
  }
  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    ) as unknown as any
    mutation.mutate({
      internalName: data.internalName,
      enabled: data.enabled,
      properties: {
        duration: data.duration,
        image: data.image,
        position: data.position,
        sound: data.sound,
      },
    })
  }
  return (
    <form
      className="gap-4 px-2 container mx-auto w-full md:max-w-5xl flex flex-col"
      onSubmit={onSubmit}
    >
      <input
        type="hidden"
        name="internalName"
        defaultValue={settingsData.internalName}
      />
      <div className="flex flex-row justify-between">
        <div className="flex flex-col gap-2 justify-center items-center">
          <Switch
            id="enabled"
            name="enabled"
            checked={isEnabled}
            onCheckedChange={handleSwitchChange}
            disabled={mutation.isPending} // Desabilite o switch durante a mutação
          />
          <Label htmlFor="enabled">
            {isEnabled ? 'Habilitado' : 'Desabilitado'}
          </Label>
        </div>
        <div className="max-w-40">
          <BoxButton disabled={!isEnabled} onClick={handleTestClick}>
            Testar
          </BoxButton>
        </div>
      </div>
      <div className="flex flex-col">
        <label>Duração de {duration} segundos</label>
        <input
          type="range"
          className="h-2 bg-gray-500 appearance-none"
          min={1000}
          step={1000}
          max={15000}
          name="duration"
          defaultValue={duration * 1000}
          onChange={(e) => setDuration(parseInt(e.target.value) / 1000)}
        ></input>
      </div>

      <div className="flex flex-col">
        <Select defaultValue={settingsData.properties.position} name="position">
          <SelectTrigger className="w-full md:w-[230px]">
            <SelectValue placeholder="Selecione a posição na tela" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Posição</SelectLabel>
              {[
                'top-left',
                'top',
                'top-right',
                'bottom-left',
                'bottom',
                'bottom-right',
              ].map((value, key) => (
                <SelectItem value={value} key={key}>
                  {value}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <SelectImagesSettings
        defaultValue={settingsData.properties.image}
        datasource={imageUrls}
      />
      <SelectAudioSettings
        defaultValue={settingsData.properties.sound}
        datasource={audioUrls}
      />
      {/* <p>URLs de Áudio: {JSON.stringify(audioUrls)}</p>
      <p>URLs de Imagem: {JSON.stringify(imageUrls)}</p> */}
      <SubmitButton>Atualizar</SubmitButton>
    </form>
  )
}
