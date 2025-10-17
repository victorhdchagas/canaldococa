import MainDivisor from '@/components/divisors/maindivisor'
import Image from 'next/image'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import ResourcesList from './resourcesList'
import UserConnectionButton from './userConnectionButton'
export type ConnectionPlatformTypes = 'kick' | 'youtube' | 'discord'

interface UserConnectionCardProps {
  platform: ConnectionPlatformTypes
  //   isEnabled: boolean
  //   resources: string[]
}
export default function UserConnectionCard({
  platform,
}: UserConnectionCardProps) {
  return (
    <div
      className="relative flex flex-col justify-start 
    border border-gray-800 shadow-m rounded-lg p-2 bg-gradient-to-b from-gray-900 to-gray-950 my-2 transition-all"
    >
      <div
        className={twMerge(
          'w-full h-24  max-h-24 overflow-hidden rounded-lg',
          platform === 'kick' ? 'bg-black' : 'bg-white',
        )}
      >
        <Image
          src={`/assets/brands/${platform}.svg`}
          className="object-contain w-full md:w-auto md:mx-auto h-full p-2 md:max-w-xs md:max-auto"
          alt=""
          width={200}
          height={200}
        />
      </div>
      <MainDivisor />
      <span className="first-letter:uppercase text-gray-300 text-lg font-semibold">
        {platform}
      </span>
      <div>
        <ResourcesList platform={platform} />
      </div>

      <div className="mt-auto">
        <UserConnectionButton platform={platform} />
      </div>
    </div>
  )
}
