import { UserProvider } from '@/contexts/userProvider'
import React, { PropsWithChildren } from 'react'

export default function Layout({ children }: PropsWithChildren) {
  return <UserProvider>{children}</UserProvider>
}
