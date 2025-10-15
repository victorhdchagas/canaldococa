import MainDivisor from '@/components/divisors/maindivisor'
import HeaderSection from '@/components/headerSection/headerSection'
import PageContainer from '@/components/Page/PageContainer'
import Title from '@/components/text/title'
import { Suspense } from 'react'
import WelcomePopup from './(components)/WelcomePopup'
import YoutubeSettingsSkeleton from './(components)/YoutubeSettingsFormSkeleton'
import YoutubeSettingsFormWrapper from './(components)/youtubeSettingsFormWrapper'

export default async function YoutubeWelcomePage({
  searchParams,
}: {
  searchParams: Promise<{ welcome?: string }>
}) {
  const { welcome } = await searchParams

  return (
    <PageContainer>
      <HeaderSection />
      <Title>Conexão YouTube</Title>
      <MainDivisor />

      {welcome && (
        <Suspense fallback={<div>Carregando...</div>}>
          <WelcomePopup />
        </Suspense>
      )}

      <section className="container p-0">
        <Suspense fallback={<YoutubeSettingsSkeleton />}>
          <YoutubeSettingsFormWrapper />
        </Suspense>
      </section>
    </PageContainer>
  )
}
