import BoxLink from '@/components/boxes/boxLink'
import HeaderSection from '@/components/headerSection/headerSection'
import Title from '@/components/text/title'
import OverlayLinkSection from './(components)/overlayLinkSection'

export default function OverlayPage() {
  return (
    <div className="font-sans bg-gray-900 gap-6 flex flex-col h-screen text-white  mx-auto">
      <HeaderSection />
      <Title>Overlay</Title>
      <section className="grid grid-cols-2 md:grid-cols-4 grid-rows-1 gap-4 px-2 container mx-auto">
        <BoxLink href="overlay/subscriber">Alerta de subscriber</BoxLink>
        <BoxLink href="overlay/thanks">Tela de Agradecimentos</BoxLink>
        <BoxLink href="overlay/messager">Mensagem do apoiador</BoxLink>
        <BoxLink href="overlay/footermessages">Anuncios de rodapé</BoxLink>
      </section>
      <OverlayLinkSection />
    </div>
  )
}
