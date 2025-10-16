import PageContainer from '@/components/Page/PageContainer'
import SettingsSidebar from './(components)/settingsSidebar'
import HeaderSection from '@/components/headerSection/headerSection'
import MainDivisor from '@/components/divisors/maindivisor'
import GridContainer from '@/components/Page/GridContainer'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import HeaderSidebarSection from '@/components/headerSection/headerSidebarSection'

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <SettingsSidebar />
      <PageContainer>
        <HeaderSidebarSection>
          <SidebarTrigger />
        </HeaderSidebarSection>
        <MainDivisor />
        <GridContainer className="gap-2">{children}</GridContainer>
      </PageContainer>
    </SidebarProvider>
  )
}
