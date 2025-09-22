import { getPaymentStatus } from '@/core/admin/payment.service'
import { getUserFromCookies } from '@/core/cookie.service'
import { unauthorized } from 'next/navigation'

export async function GET() {
  try {
    const user = await getUserFromCookies()
    if (user.role !== 'ADMIN') {
      unauthorized()
    }

    const toReturn = await getPaymentStatus() //getPaymentStatus()

    return Response.json({ pagination: { page: 1 }, data: toReturn })
  } catch (err) {
    return Response.json(err, { status: 400 })
  }
}

async function getFakeList() {
  const fakeList = [
    {
      name: 'Jill Valentine',
      plan: 'LEGEND',
      date: new Date(),
    },
    {
      name: 'Albert Wesker',
      plan: 'LEGEND',
      date: new Date(),
    },
    {
      name: 'Chris Redfield',
      plan: 'USER',
      date: new Date(),
    },
    {
      name: 'John Ada Mole',
      plan: 'USER',
      date: new Date(),
    },
    {
      name: 'Leon',
      plan: 'LEGEND',
      date: new Date(),
    },
  ]
  return fakeList.map((data, index) => ({ ...data, id: index + 1 }))
}
