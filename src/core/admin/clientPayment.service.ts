'use client'
import { Pagination } from '@/types/pagination'

export async function getClientPaymentStatus(
  query?: string,
  page?: number,
  offset?: number,
): Promise<
  | (Pagination & {
      data: { id: number; name: string; status: string; date: Date }[]
    })
  | null
> {
  const url = new URL(`${window.location.origin}/api/admin/getusers`)
  if (page) {
    url.searchParams.set('page', page.toString())
  }
  if (query) {
    url.searchParams.set('query', query.toString())
  }
  if (offset) url.searchParams.set('offset', offset.toString())

  const response = await fetch(url, {
    method: 'get',
  })
  const data = await response.json()
  if (data) {
    return {
      ...data,
      data: data.data.map((d) => ({ ...d, date: new Date(d.date) })),
    }
  }
  return null
}
