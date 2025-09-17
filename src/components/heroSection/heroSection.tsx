import React from 'react'
import './hero.css'

export default function HeroSection() {
  return (
    <section className="hero">
      <div className="flex flex-col text-center select-none gap-2 bg-gray-800/80 backdrop-blur-lg p-4 rounded-lg">
        <span className="text-3xl font-bold text-yellow-500 text-shadow-lg animate-fade-in ">
          Ta buscando um gás?!
        </span>
        <span className="text-xl text-gray-100">
          Confira o canal do amigo do Monark
        </span>
      </div>
      <img
        src="/assets/coca_head.png"
        className="bottom-0 left-0 h-64 md:h-96 w-auto absolute"
      />
    </section>
  )
}
