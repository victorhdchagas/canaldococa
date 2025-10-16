import MainDivisor from '@/components/divisors/maindivisor'
import HeaderSection from '@/components/headerSection/headerSection'
import PageContainer from '@/components/Page/PageContainer'
import UserStatusWrapper from './(components)/userStatus/userStatusWrapper'
import { Suspense } from 'react'
import UserStatusSkeleton from './(components)/userStatus/userStatusSkeleton'
import UserTitles from './(components)/userTitles/userTitles'
import GridContainer from '@/components/Page/GridContainer'

export default async function UserAccoungPage() {
  return (
    <PageContainer>
      <HeaderSection />
      <MainDivisor />
      <GridContainer className="gap-2 xl:grid-cols-4">
        <Suspense fallback={<UserStatusSkeleton />}>
          <UserStatusWrapper />
        </Suspense>
        <UserTitles />
      </GridContainer>
    </PageContainer>
  )
}
