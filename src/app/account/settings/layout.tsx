import MainDivisor from '@/components/divisors/maindivisor'
import HeaderSidebarSection from '@/components/headerSection/headerSidebarSection'
import PageContainer from '@/components/Page/PageContainer'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import SettingsSidebar from './(components)/settingsSidebar'

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
        {children}
      </PageContainer>
    </SidebarProvider>
  )
}
