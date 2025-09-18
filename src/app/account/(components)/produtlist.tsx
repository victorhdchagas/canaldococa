import { Services } from '@/types/services'
import axios from 'axios'
import React from 'react'
import ServiceCard from './productcard'
import { cookies } from 'next/headers'

export default async function ProductList() {
  const [response, cookieStorage] = await Promise.all([
    axios.get(`${process.env.API_BASEURL}/payments/products`, {
      withCredentials: true,
    }),
    cookies(),
  ])

  const user = JSON.parse(cookieStorage.get('user')!.value)

  const services: Services[] = response.data.map((data: any) => ({
    images: data.images,
    name: data.name,
    description: data.description,
    unit_amount: data.defaultPrice.unit_amount,
    priceId: data.defaultPrice.id,
  }))
  return (
    <div className="flex flex-row mx-auto max-w-1/2 gap-4">
      {services.map((service) => (
        <ServiceCard service={service} key={service.priceId} userId={user.id} />
      ))}
    </div>
  )
}
