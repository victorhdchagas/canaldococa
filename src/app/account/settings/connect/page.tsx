import Box from '@/components/boxes/box'
import React, { Suspense } from 'react'
import UserConnectionCard from './(components)/userconnectionCard'

export default function SettingsConnectpage() {
  return (
    <Box
      title="Conexões"
      subtitle="Vincule suas contas a plataforma"
      className="md:max-w-full w-full"
    >
      <section className="grid md:grid-cols-2 gap-2 grid-cols-1">
        <UserConnectionCard platform="youtube" />
        <UserConnectionCard platform="kick" />
        <UserConnectionCard platform="discord" />
      </section>
    </Box>
  )
}
