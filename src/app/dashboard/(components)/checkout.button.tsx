'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function CheckoutButton({
  userId,
  priceId,
}: {
  priceId: string
  userId: number
}) {
  const router = useRouter()
  //   const updateUserWithId = updateUser.bind(null, userId, priceId)
  async function onSubmit(event: React.FormEvent) {
    event.preventDefault()
    const response = await axios.post('/api/checkout', {
      priceId,
    })
    if (response.status == 200 && 'url' in response.data) {
      router.push(response.data.url)
      return
    }
    console.log(response)
  }
  return (
    <form onSubmit={onSubmit}>
      <button
        type="submit"
        className="mt-4 w-full bg-indigo-600 cursor-pointer text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors duration-200"
      >
        Checkout
      </button>
    </form>
  )
}
