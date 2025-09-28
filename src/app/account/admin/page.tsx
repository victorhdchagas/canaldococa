import HeaderSection from '@/components/headerSection/headerSection'
import PageContainer from '@/components/Page/PageContainer'
import Title from '@/components/text/title'
import ConnectionsSection from './(components)/ConnectionsSection'
import MainDivisor from '@/components/divisors/maindivisor'

export default async function UserPage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>
}) {
  const query = await searchParams

  return (
    <PageContainer>
      <HeaderSection />
      <Title>Dashboard</Title>
      <MainDivisor />
      <section className="container flex flex-col justify-start items-start w-full gap-4 px-0.5">
        <ConnectionsSection />
      </section>
    </PageContainer>
  )
}
