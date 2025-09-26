import AuthGuardProvider from '@/contexts/AuthGuardProvider'
import { PropsWithChildren } from 'react'

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <>
      <AuthGuardProvider requiredRole="ADMIN" />
      {children}
    </>
  )
}
