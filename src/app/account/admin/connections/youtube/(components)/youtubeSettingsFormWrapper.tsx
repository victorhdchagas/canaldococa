import { ValidationTags } from '@/consts/validation-tags'
import { serverEnv } from '@/env/server'
import { getServerToken } from '@/lib/server-api-client'
import React from 'react'
import YoutubeSettingsForm from './YoutubeSettingsForm'

export default async function YoutubeSettingsFormWrapper() {
  const token = await getServerToken()
  const response = await fetch(`${serverEnv.API_URL}/platform/youtube`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    next: {
      tags: [ValidationTags.YOUTUBE_CHAT_CONFIG],
    },
  })

  const data = await response.json()

  return (
    <YoutubeSettingsForm
      isEnabled={data.isEnabled}
      showLevelUpOverlay={data.showLevelUpOverlay}
      xpForNewMember={data.xpForNewMember}
      xpPerMessage={data.xpPerMessage}
      xpPerSuperChat={data.xpForSuperChat}
      isConnectionEnabled={data.isConnectionEnabled || true}
    />
  )
}
