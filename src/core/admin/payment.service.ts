import { Pagination } from '@/types/pagination'
import { cookies } from 'next/headers'

export async function getPaymentStatus(
  page?: number,
  offset?: number,
): Promise<(Pagination & { data: any }) | null> {
  const cookieStore = await cookies()
  const url = new URL(`${process.env.API_BASEURL!}/admin/payments`)
  if (page) {
    url.searchParams.set('page', page.toString())
  }
  if (offset) url.searchParams.set('offset', offset.toString())
  const token = cookieStore.get('token')!.value
  const response = await fetch(url, {
    method: 'get',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    // credentials: 'include',
  })
  if (response.status > 300) {
    const data = await response.json()
    throw data
  }
  const data = await response.json()
  if (data) {
    return data
  }
  return null
}
