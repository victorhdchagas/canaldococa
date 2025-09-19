'use client'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'

interface ActionDropdownProps {
  userId: string | number
  onEdit: (id: string | number) => void
  onDelete: (id: string | number) => void
  onActivate: (id: string | number) => void
}

export function ActionDropdown({
  userId,
  onEdit,
  onDelete,
  onActivate,
}: ActionDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => onEdit(userId)}>
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onDelete(userId)}>
          Deletar
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => onActivate(userId)}>
          Ativar Apoiador
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
