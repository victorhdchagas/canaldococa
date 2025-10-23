import HeaderSection from '@/components/headerSection/headerSection'
import PageContainer from '@/components/Page/PageContainer'
import Title from '@/components/text/title'
import ConnectionsSection from './(components)/connections/ConnectionsSection'
import MainDivisor from '@/components/divisors/maindivisor'
import WelcomeUser from './(components)/WelcomeUsers'
import { getToken } from '@/core/cookie.service'
import { Suspense } from 'react'

export default async function UserPage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>
}) {
  const token = await getToken()

  return (
    <PageContainer>
      <HeaderSection />
      <Title>Dashboard</Title>
      <MainDivisor />
      <section className="container flex flex-col md:flex-row justify-start items-start w-full gap-4 px-0.5">
        <Suspense fallback={<>Loading</>}>
          <ConnectionsSection />
        </Suspense>
        <WelcomeUser token={token} />
      </section>
    </PageContainer>
  )
}
