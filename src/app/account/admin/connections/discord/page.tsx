import MainDivisor from '@/components/divisors/maindivisor'
import HeaderSection from '@/components/headerSection/headerSection'
import PageContainer from '@/components/Page/PageContainer'
import Title from '@/components/text/title'
import React, { Suspense } from 'react'
import DiscordSettingsForm from './(components)/DiscordSettignsForm'

export default function DiscordSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>
}) {
  return (
    <PageContainer>
      <HeaderSection />
      <Title>Conexão YouTube</Title>
      <MainDivisor />

      <section className="container p-0">
        <DiscordSettingsForm />
      </section>
    </PageContainer>
  )
}
