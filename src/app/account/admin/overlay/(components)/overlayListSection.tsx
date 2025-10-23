'use client'
import BoxLink from '@/components/boxes/boxLink'
import { getAllOverlays } from '@/core/admin/clientOverlay.service'
import { Loading02FreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useQuery } from '@tanstack/react-query'

export default function OverlayListSection() {
  const {
    data: overlays,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ['admin.overlay'],
    queryFn: () => getAllOverlays(),
  })
  if (isPending) {
    return (
      <div className="h-1/2 flex justify-start items-center flex-col">
        <HugeiconsIcon
          icon={Loading02FreeIcons}
          size={36}
          className="animate-spin h-24 w-24 text-red-800 text-shadow-xs text-shadow-amber-400"
        />
        <span className="text-yellow-500 font-mono"> Carregando </span>
      </div>
    )
  }

  if (isError) {
    console.log(error.message)
    return (
      <div className="h-1/2 flex justify-start items-start text-yellow-500 ">
        Ocorreu um erro: {error.message}
      </div>
    )
  }

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 grid-rows-1 gap-4 px-2 container mx-auto">
      {overlays.map((overlay: any) => (
        <BoxLink href={`overlay/${overlay.internalName}`} key={overlay.id}>
          {overlay.name}
        </BoxLink>
      ))}
    </section>
  )
}
