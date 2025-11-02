import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import QueryProvider from '@/contexts/queryClientProvider'
import { Toaster } from 'sonner'
import { UserProvider } from '@/contexts/userProvider'
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister'
import PushNotificationManager from '@/components/PushNotificationManager'

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
    <html className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <UserProvider>
            <ServiceWorkerRegister />
            <PushNotificationManager />
            <Toaster />
            {children}
          </UserProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
