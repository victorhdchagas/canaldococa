import { UserNotAllowedException } from '@/core/exceptions/errors'

const URL_PATHS = new Map<string, string[][]>()

URL_PATHS.set('ADMIN', [
  ['Painel', '/account/admin'],
  ['Overlay', '/account/admin/overlay'],
  ['Usuarios', '/account/admin/users'],
])
URL_PATHS.set('USER', [['Minha conta', '/account']])

export function validateRole(role: string, path: string) {
  const adminRoutes = URL_PATHS.get('ADMIN')
  if (adminRoutes?.some(([, route]) => path.startsWith(route))) {
    if (role !== 'ADMIN') {
      throw new UserNotAllowedException()
    }
  }
}

export default URL_PATHS
