'use client'
import SimpleHeader from '@/components/headerSection/SimpleHeader'
import LoginButton from './(components)/LoginButton'
import PageContainer from '@/components/Page/PageContainer'
import Link from 'next/link'
import LoginCarousel from './(components)/LoginCarousel'
import BottomWaves from './(components)/bottomWaves'

export default function LoginPage() {
  return (
    <PageContainer>
      <SimpleHeader />
      <div className="flex min-h-screen items-center justify-center bg-transparent text-foreground animate-fade-in flex-col-reverse md:flex-row">
        <div className="relative flex  justify-center  items-center flex-row bg-card border border-border overflow-hidden rounded-lg ">
          <div className=" z-10 flex flex-col items-center bg-card/80 backdrop-blur-md rounded-lg md:w-md pb-18 gap-4 ">
            <p className="text-center text-primary text-xl font-extrabold mb-16 mt-10">
              Entre para continuar.
            </p>
            <LoginButton variant="discord">Entrar com Discord</LoginButton>
            <LoginButton variant={'youtube'}>Entrar com YouTube</LoginButton>
            <LoginButton variant="kick">Entrar com Kick</LoginButton>
            <Link href="/" className="mt-4">
              Voltar
            </Link>

            <BottomWaves />
          </div>
          <LoginCarousel />
        </div>
      </div>
    </PageContainer>
  )
}
