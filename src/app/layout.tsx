import PushNotificationManager from '@/components/PushNotificationManager'
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'
import { SidebarProvider } from '@/components/ui/sidebar'
import QueryProvider from '@/contexts/queryClientProvider'
import { UserProvider } from '@/contexts/userProvider'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Toaster } from 'sonner'
import SettingsSidebar from './account/settings/(components)/settingsSidebar'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
export const metadata: Metadata = {
  title: 'Canal do Coca',
  description: 'Pagina do Canal do Coca',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html className="dark" lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <UserProvider>
            <SidebarProvider defaultOpen={false}>
              <SettingsSidebar />
              {process.env.NODE_ENV !== 'development' && (
                <ServiceWorkerRegister />
              )}
              <PushNotificationManager />
              <Toaster />
              {children}
            </SidebarProvider>
          </UserProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
