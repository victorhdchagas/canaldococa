'use client'
import ErrorBox from '@/components/boxes/errorBox'
import LoadingBox from '@/components/boxes/loadingBox'
import BoxButton from '@/components/buttons/boxButton'
import { toast } from 'sonner'
import { Label } from '@/components/ui/label'
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
import { OverlaySubscribersSettings } from '@/types/services'
import SubmitButton from '@/components/buttons/submitbutton'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import SelectImagesSettings from './selectImagesSettings'
import SelectAudioSettings from './selectAudioSettings'

export default function SubscribersSettings() {
  const queryClient = useQueryClient()
  const [duration, setDuration] = useState(0)

  const results = useQueries({
    queries: [
      {
        queryKey: ['admin.overlay.settings', 'subscribers'],
        queryFn: () =>
          getOverlaySettings('subscribers-settings').then((ret) => {
            setDuration(ret.duration / 1000)
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
  const [isEnabled, setIsEnabled] = useState(settingsData?.enabled)

  const handleTestClick = useCallback(() => {
    if (settingsData?.id)
      testOverlay(settingsData.id)
        .then(() => {
          toast('Teste enviado com sucesso')
        })
        .catch((err) => toast(err.message))
  }, [settingsData?.id]) // A função só será recriada se settingsData.id mudar

  const mutation = useMutation({
    mutationFn: updateOverlaySettings,
    onSuccess: () => {
      // Invalide o cache para rebuscar as configurações mais recentes
      queryClient.invalidateQueries({
        queryKey: ['admin.overlay.settings', 'subscribers'],
      })
    },
    onError: (error) => {
      // Se a mutação falhar, reverta o estado do switch
      setIsEnabled(!isEnabled)
      console.error('Falha ao atualizar o switch:', error)
    },
  })

  const handleSwitchChange = useCallback(
    (checked: boolean) => {
      // 1. Atualize o estado local (mudança otimista na UI)
      setIsEnabled(checked)

      console.log(settingsData)
      mutation.mutate({ ...settingsData!, enabled: checked })
    },
    [settingsData],
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
    ) as unknown as OverlaySubscribersSettings
    mutation.mutate(data)
  }
  return (
    <form
      className="gap-4 px-2 container mx-auto w-full md:max-w-5xl flex flex-col"
      onSubmit={onSubmit}
    >
      <input type="hidden" name="id" value={settingsData.id} />
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
          max={5000}
          name="duration"
          onChange={(e) => setDuration(parseInt(e.target.value) / 1000)}
        ></input>
      </div>

      <div className="flex flex-col">
        <Select defaultValue={settingsData.position}>
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
        defaultValue={settingsData.image}
        datasource={imageUrls}
      />
      <SelectAudioSettings
        defaultValue={settingsData.sound}
        datasource={audioUrls}
      />
      {/* <p>URLs de Áudio: {JSON.stringify(audioUrls)}</p>
      <p>URLs de Imagem: {JSON.stringify(imageUrls)}</p> */}
      <SubmitButton>Atualizar</SubmitButton>
    </form>
  )
}
