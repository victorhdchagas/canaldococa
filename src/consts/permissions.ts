'use client'
const URL_PATHS = new Map<string, string[][]>()

URL_PATHS.set('ADMIN', [
  ['Painel', '/account/admin'],
  ['Usuarios', '/account/admin/users'],
])
URL_PATHS.set('USER', [['Minha conta', '/account']])

export default URL_PATHS
