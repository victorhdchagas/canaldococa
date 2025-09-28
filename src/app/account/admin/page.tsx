import HeaderSection from '@/components/headerSection/headerSection'
import PageContainer from '@/components/Page/PageContainer'
import Title from '@/components/text/title'

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
      <section className="container mx-auto"></section>
    </PageContainer>
  )
}
