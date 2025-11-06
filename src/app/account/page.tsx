import MainDivisor from '@/components/divisors/maindivisor'
import HeaderSection from '@/components/headerSection/headerSection'
import GridContainer from '@/components/Page/GridContainer'
import PageContainer from '@/components/Page/PageContainer'
import { Suspense } from 'react'
import UserStatusSkeleton from './(components)/userStatus/userStatusSkeleton'
import UserStatusWrapper from './(components)/userStatus/userStatusWrapper'

export default async function UserAccoungPage() {
  return (
    <PageContainer>
      <HeaderSection />
      <MainDivisor />
      <GridContainer className="gap-2 xl:grid-cols-4 px-1">
        <Suspense fallback={<UserStatusSkeleton />}>
          <UserStatusWrapper />
        </Suspense>
      </GridContainer>
    </PageContainer>
  )
}
