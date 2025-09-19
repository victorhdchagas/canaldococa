import { Pagination } from '@/types/pagination'

export async function getPaymentStatus(
  page?: number,
  offset?: number,
): Promise<(Pagination & { data: any }) | null> {
  const url = new URL(`${process.env.API_BASEURL!}/api/admin/getusers`)
  if (page) {
    url.searchParams.set('page', page.toString())
  }
  if (offset) url.searchParams.set('offset', offset.toString())

  const response = await fetch(url, {
    method: 'get',
    credentials: 'include',
  })
  const data = await response.json()
  if (data) {
    return data
  }
  return null
}
