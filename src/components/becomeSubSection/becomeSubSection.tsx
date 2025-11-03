import React from 'react'
import Title from '../text/title'
import { Button } from '../ui/button'
import { Check, Star } from 'lucide-react'
import BubblesSection from '../bubbles/bubblesSection'
import { cn } from '@/lib/utils'

interface SubscriptionCardProps {
  title: string
  image: string
  goodies: string[]
  price: string
  buttonText: string
  isPopular?: boolean
}

function SubscriptionCard({
  title,
  image,
  goodies,
  price,
  buttonText,
  isPopular,
}: SubscriptionCardProps) {
  return (
    <div
      className={cn(
        `bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col relative group`,
        isPopular ? 'border-primary ring-2 ring-primary/20' : 'border-border',
      )}
    >
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1 group-hover:scale-110 transition-transform bg-gray-200 -translate-y-2">
          <div className="bg-gray-200 text-yellow-900 px-1 py-1 rounded-full  flex items-center gap-2 text-nowrap">
            <Star className="w-4 h-4 group-hover:scale-175 group-hover:-rotate-12 group-hover:animate-pulse group-hover:-translate-y-1 transition-transform" />
            Mais Popular
          </div>
        </div>
      )}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
      <ul className="space-y-2 mb-4 flex-grow">
        {goodies.map((goodie, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
            <span className="text-sm text-muted-foreground">{goodie}</span>
          </li>
        ))}
      </ul>
      <div className="text-2xl font-bold text-foreground mb-4">{price}</div>
      <Button
        className={`w-full ${
          isPopular ? 'bg-primary hover:bg-primary/90' : ''
        }`}
      >
        {buttonText}
      </Button>
    </div>
  )
}

export default function BecomeSubscriberSection() {
  // Placeholder data for three plans
  const plans = [
    {
      title: 'Plano Básico',
      image: '/assets/coca_head.png',
      goodies: ['Acesso a vídeos exclusivos', 'Suporte por email'],
      price: 'R$ 5,90 / mês',
      buttonText: 'Assinar Básico',
    },
    {
      title: 'Plano Pro',
      image: '/assets/coca_head.png',
      goodies: [
        'Acesso a vídeos exclusivos',
        'Suporte prioritário',
        'Badge especial no chat',
        'Conteúdo premium mensal',
        'Acesso antecipado a novos vídeos',
      ],
      price: 'R$ 9,90 / mês',
      buttonText: 'Assinar Pro',
      isPopular: true,
    },
    {
      title: 'Plano Premium',
      image: '/assets/coca_head.png',
      goodies: [
        'Acesso a vídeos exclusivos',
        'Suporte prioritário 24/7',
        'Badge especial no chat',
        'Conteúdo premium mensal',
        'Acesso antecipado a novos vídeos',
        'Lives exclusivas',
        'Merchandise grátis',
      ],
      price: 'R$ 14,90 / mês',
      buttonText: 'Assinar Premium',
    },
  ]

  return (
    <section id="plans" className="relative select-none p-8 container mx-auto ">
      <BubblesSection className="absolute inset-0 z-0 " />
      <div className="relative top-0 left-0  z-20 container mx-auto">
        <span className="text-primary flex justify-center my-2 text-4xl mx-auto py-4 font-bold">
          Torne-se Membro
        </span>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <SubscriptionCard key={index} {...plan} />
          ))}
        </div>
      </div>
    </section>
  )
}
