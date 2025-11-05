'use client'

import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import AutoPlay from 'embla-carousel-autoplay'
import Image from 'next/image'
export default function LoginCarousel() {
  const plugin = React.useRef(
    AutoPlay({ delay: 5000, stopOnInteraction: true }),
  )
  return (
    <div className="hidden md:flex  ">
      <Carousel className="w-full max-w-xs" plugins={[plugin.current]}>
        <CarouselContent>
          <CarouselItem>
            <Image
              src="/assets/tag01.png"
              alt="Login"
              width={500}
              height={500}
              className="h-full object-cover"
            />
          </CarouselItem>
          {Array.from({ length: 4 }).map((_, index) => (
            <CarouselItem key={index}>
              <Image
                src={`/assets/tag0${index + 2}.jpg`}
                alt="Login"
                width={500}
                height={500}
                className="h-full object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
