'use client'
import { ActionDropdown } from '@/components/dropdowns/actionDropdown'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { getClientPaymentStatus } from '@/core/admin/clientPayment.service'
import { Loading02FreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { useQuery } from '@tanstack/react-query'

export default function PaymentUserList({
  page = 1,
  offset = 0,
  query,
}: {
  page?: number
  offset?: number
  query?: string
}) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['admin.payment.users', page, offset, query],
    queryFn: () => getClientPaymentStatus(query, page, offset),
  })

  if (isPending) {
    return (
      <div className="h-1/2 flex justify-start items-center flex-col">
        <HugeiconsIcon
          icon={Loading02FreeIcons}
          size={36}
          className="animate-spin h-24 w-24 text-red-800 text-shadow-xs text-shadow-amber-400"
        />
        <span className="text-yellow-500 font-mono"> Carregando </span>
      </div>
    )
  }

  if (isError) {
    console.log(error.message)
    return (
      <div className="h-1/2 flex justify-start items-start text-yellow-500 ">
        Ocorreu um erro: {error.message}
      </div>
    )
  }

  return <div>{data && <UserTable data={data.data} />}</div>
}

function UserTable({
  data,
}: {
  data: {
    id: number
    name: string
    plan: string
    date: Date
  }[]
}) {
  const handleEdit = (id: string | number) => {
    console.log(`Editando usuário com ID: ${id}`)
    // Lógica para editar
  }

  const handleDelete = (id: string | number) => {
    console.log(`Deletando usuário com ID: ${id}`)
    // Lógica para deletar
  }

  const handleActivate = (id: string | number) => {
    console.log(`Ativando usuário com ID: ${id}`)
    // Lógica para ativar
  }
  return (
    <Table>
      <TableCaption className="text-yellow-500">
        Lista de apoiadores
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px] text-yellow-500">Criado em</TableHead>
          <TableHead className="text-yellow-500">Nome</TableHead>
          <TableHead className="text-yellow-500">Plano</TableHead>
          <TableHead className="text-right text-yellow-500">Control</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="font-medium">
              {payment.date.toLocaleDateString('pt-br', {
                timeZone: 'America/Sao_paulo',
              })}
            </TableCell>
            <TableCell>{payment.name}</TableCell>
            <TableCell>{payment.plan || 'Free'}</TableCell>
            <TableCell className="text-right">
              <ActionDropdown
                userId={payment.id}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onActivate={handleActivate}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      {/* <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter> */}
    </Table>
  )
}
