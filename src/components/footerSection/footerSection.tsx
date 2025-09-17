import { SocialMedia } from '@/types/services'
import React from 'react'
import YoutubeIcon from '../ui/icons/youtubeIcon'

export default function FooterSection({
  socialNetworks,
}: {
  socialNetworks: SocialMedia[]
}) {
  return (
    <div className="bg-stone-900 flex flex-col w-full h-auto py-4">
      <div className="flex container flex-row justify-center align-center gap-4">
        <YoutubeIcon />
        <YoutubeIcon />
        <YoutubeIcon />
      </div>
      <div className="flex container flex-row justify-center align-center text-yellow-500">
        Canal do Coca, todos os direitos reservados
      </div>
    </div>
  )
}
