'use client'
import URL_PATHS from '@/consts/permissions'
import { useLogout } from '@/lib/use-logout'
import { LogOut, Settings, User } from 'lucide-react'
import Link from 'next/link'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function ContextMenu({
  userAvatar,
  role,
  username,
}: {
  userAvatar: string
  role: string
  username: string
}) {
  const { logout } = useLogout()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-2 rounded-full focus:outline-none focus:ring-2 focus:ring-ring">
          <Avatar className="w-8 h-8">
            <AvatarImage src={userAvatar} />
            <AvatarFallback>{username.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{username}</p>
            <p className="text-xs leading-none text-muted-foreground">{role}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {role === 'ADMIN' &&
          URL_PATHS.get(role)?.map(([label, href]) => (
            <DropdownMenuItem key={label} asChild>
              <Link href={href}>{label}</Link>
            </DropdownMenuItem>
          ))}
        <DropdownMenuItem asChild>
          <Link href="/account" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Meu Perfil
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/account/settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Configurações
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="text-destructive focus:text-destructive">
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
