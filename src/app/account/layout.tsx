// app/account/layout.tsx (não no layout raiz)
import { RefreshHandler } from '@/components/RefreshHandler'
import { validateSession } from '@/lib/auth-server'
import { redirect } from 'next/navigation'

export default async function AccountLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await validateSession()

  // Se não tem nenhum token, redireciona imediatamente
  if (!session.isValid && !session.needsRefresh) {
    redirect('/login')
  }

  // Se precisa refresh, mostra o RefreshHandler uma única vez
  if (session.needsRefresh) {
    return (
      //   <UserProvider>
      <RefreshHandler />
      //   </UserProvider>
    )
  }

  // Token válido, renderiza o conteúdo
  return <>{children}</>
}
