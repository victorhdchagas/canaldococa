import { Services } from '@/types/services'
import React from 'react'
import CheckoutButton from './checkout.button'

export default function ServiceCard({
  service,
  userId,
}: {
  userId: number
  service: Services
}) {
  return (
    <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      {/* Image Section */}
      <div className="relative h-48">
        <img
          src={service.images[0] || '/placeholder-image.jpg'}
          alt={service.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h2>
        <p className="text-gray-600 text-sm mb-4">{service.description}</p>

        {/* Price Section */}
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-indigo-600">
            R$ {(service.unit_amount / 100).toFixed(2)}
          </span>
          <span className="text-xs text-gray-500">ID: {service.priceId}</span>
        </div>

        <CheckoutButton userId={userId} priceId={service.priceId} />
      </div>
    </div>
  )
}
