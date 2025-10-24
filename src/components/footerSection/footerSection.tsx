import { SocialMedia } from '@/types/services'
import React from 'react'
import YoutubeIcon from '../ui/icons/youtubeIcon'
import { HugeiconsIcon } from '@hugeicons/react'
import { Kickstarter01FreeIcons } from '@hugeicons/core-free-icons'

export default function FooterSection({
  socialNetworks,
}: {
  socialNetworks: SocialMedia[]
}) {
  return (
    <div className="bg-stone-900 flex flex-col justify-center items-center w-full  py-4 ">
      <div className="flex container flex-row justify-center align-center gap-4">
        {socialNetworks.map((network) => {
          return (
            <a
              key={network.id}
              href={network.uri}
              target="_blank"
              rel="noopener noreferrer"
            >
              {network.type === 'youtube' && <YoutubeIcon />}
              {network.type === 'kick' && (
                <HugeiconsIcon
                  size={24}
                  icon={Kickstarter01FreeIcons}
                  className="text-emerald-500"
                />
              )}
            </a>
          )
        })}
      </div>
      <div className="flex container flex-row justify-center align-center text-yellow-500">
        Canal do Coca, todos os direitos reservados
      </div>
    </div>
  )
}
