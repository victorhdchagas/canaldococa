import { getClientPaymentStatus } from '@/core/admin/clientPayment.service'
import { getUserFromCookies } from '@/core/cookie.service'
import { unauthorized } from 'next/navigation'

export async function GET() {
  try {
    const user = await getUserFromCookies()
    if (user.role !== 'ADMIN') {
      unauthorized()
    }

    const toReturn = await getFakeList() //getClientPaymentStatus()
    return Response.json({ pagination: { page: 1 }, data: toReturn })
  } catch {
    unauthorized()
  }
}

async function getFakeList() {
  const fakeList = [
    {
      name: 'Jill Valentine',
      status: 'PAID',
      date: new Date(),
    },
    {
      name: 'Albert Wesker',
      status: 'PAID',
      date: new Date(),
    },
    {
      name: 'Chris Redfield',
      status: 'CANCELED',
      date: new Date(),
    },
    {
      name: 'John Ada Mole',
      status: 'CANCELED',
      date: new Date(),
    },
    {
      name: 'Leon',
      status: 'PAID',
      date: new Date(),
    },
  ]
  return fakeList.map((data, index) => ({ ...data, id: index + 1 }))
}
