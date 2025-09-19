'use client'
import ErrorBox from '@/components/boxes/errorBox'
import LoadingBox from '@/components/boxes/loadingBox'
import SubmitButton from '@/components/buttons/submitbutton'
import BlurredElement from '@/components/inputs/blurredInput'
import Subtitle from '@/components/text/subtitle'
import {
  getOverlayLink,
  updateOverlayLink,
} from '@/core/admin/clientOverlay.service'
import { useMutation, useQuery } from '@tanstack/react-query'

export default function OverlayLinkSection() {
  const queryKey = ['admin.overlay.link']

  const {
    data: overlayLink,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey,
    queryFn: () => getOverlayLink(),
  })

  const { mutate, isPending: isMutatePending } = useMutation({
    async onMutate(variables, ctx) {
      await ctx.client.cancelQueries({ queryKey })
      const optmisticLink = variables
      ctx.client.setQueryData(queryKey, (old) => [old, optmisticLink])

      return optmisticLink
    },
    onSuccess(data, _variables, _onMutateResult, context) {
      context.client.setQueryData(queryKey, (old) => {
        return data
      })
    },
    onError: (_error, _variables, _onMutateResult, ctx) => {
      ctx.client.setQueryData(queryKey, (old) => old)
    },
    retry: 3,
    mutationFn: updateOverlayLink,
  })

  if (isPending) {
    return (
      <section className="gap-4 px-2 container mx-auto w-full md:max-w-[400px]">
        <LoadingBox />
      </section>
    )
  }

  if (isError)
    return (
      <section className="gap-4 px-2 container mx-auto w-full md:max-w-[400px]">
        <Subtitle>Link do OBS</Subtitle>

        <ErrorBox>{error.message}</ErrorBox>
      </section>
    )

  return (
    <form
      className="flex flex-col  gap-4 px-2 container mx-auto"
      onSubmit={(e) => {
        e.preventDefault()
        // const link = new FormData(e.currentTarget).get('overlaylink')
        mutate()
      }}
    >
      <Subtitle>Link do OBS</Subtitle>
      <span className="text-gray-400 italic ">
        Copie e cole o link abaixo no seu OBS
      </span>
      <div className="flex flex-col justify-between items-start gap-2">
        <BlurredElement>
          <input
            type="text"
            value={overlayLink}
            name="overlaylink"
            readOnly
            className="w-full px-2 rounded-sm"
          />
        </BlurredElement>
        <SubmitButton disabled={isMutatePending}>
          {isMutatePending || isPending ? 'Atualizando' : 'Atualizar'}
        </SubmitButton>
      </div>
    </form>
  )
}
