'use client'
import React, { useContext } from 'react'
import { UserContext } from './userContext'
import { toast } from 'sonner'

export default function AuthGuardProvider({
  requiredRole,
}: {
  requiredRole?: string
}) {
  const { user, isLoading } = useContext(UserContext)
  if (isLoading) return <></>
  if (!user) toast.warning('Sua sessão esta encerrada')
  if (
    requiredRole &&
    user &&
    user.role.toUpperCase() !== requiredRole.toUpperCase()
  ) {
    toast.warning('Sem permissão')
  }
  return <></>
}
