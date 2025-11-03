'use client'
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import './hero.css'
import Link from 'next/link'
import { ArrowDown } from 'lucide-react'
const PHRASES = [
  {
    title: 'Sinceridade Sem Patch de Correção.',
    subtitle: 'Política na cara, gameplay insano e o caos de sempre.',
  },
  {
    title: 'Aqui o Caos é Real e o Jogo é Sincero.',
    subtitle: 'Crítica política na tampa. Jogatina sem roteiro.',
  },
  {
    title: 'Tá Buscando a Real? A Live é Aqui.',
    subtitle: 'Da política ao gameplay, só o que vale o seu tempo.',
  },
  {
    title: 'Onde a Realidade Não Tem Filtro.',
    subtitle: 'Política na Veia e Gameplay no Talento.',
  },
]

export default function HeroSection() {
  const [currentPhrase, setCurrentPhrase] = useState<{
    title: string
    subtitle: string
  } | null>(null)

  useEffect(() => {
    // Lógica para escolher um índice aleatório
    const randomIndex = Math.floor(Math.random() * PHRASES.length)

    setCurrentPhrase(PHRASES[randomIndex])
  }, [])

  return (
    <section className="hero">
      {currentPhrase && (
        <>
          <div className="flex flex-col text-center select-none gap-4 bg-card/90 backdrop-blur-md p-6 rounded-xl border border-border/50 shadow-m">
            {/* 3. Renderiza a frase escolhida dinamicamente */}
            <span className="text-4xl font-bold text-primary leading-tight animate-fade-in">
              {currentPhrase.title}
            </span>
            <span className="text-lg text-muted-foreground leading-relaxed">
              {currentPhrase.subtitle}
            </span>
            <Link
              href="#plans"
              className="btn text-lg mt-2 ml-auto flex items-center group hover:scale-110 transition-transform"
            >
              Assine Agora{' '}
              <ArrowDown className="ml-2 h-5 w-5 animate-pulse group-hover:duration-75 " />
            </Link>
          </div>
          <Image
            src="/assets/coca_head.png"
            alt="hero image"
            width={300}
            height={384}
            className="bottom-0 left-0 h-64 md:h-96 w-auto absolute"
          />
        </>
      )}
    </section>
  )
}
