import Box from '@/components/boxes/box'
import UserSettingsForm from './(components)/settingsForm'
import GridContainer from '@/components/Page/GridContainer'
import Image from 'next/image'

export default function SettingsRootpage() {
  return (
    <Box
      title="Dados da conta"
      subtitle="Informações sobre sua conta e dados de exibição."
      className="md:max-w-xl w-full"
    >
      <GridContainer className="gap-2 md:grid-cols-2">
        <UserSettingsForm />
        <div className="grid-cols-1 md:block  hidden w-full h-full relative">
          <Image
            src="/assets/bg2.jpg"
            alt=""
            width={500}
            height={500}
            className="object-cover w-full h-full"
          />
          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2
            backdrop-blur-xs bg-gray-800/10 p-4 rounded-lg flex flex-col gap-2 w-4/5
          "
          >
            <span className="text-2xl font-bold text-yellow-500">
              Viva la vida
            </span>
            <span className="text-sm text-gray-300">Vingartio Leviossa</span>
          </div>
        </div>
      </GridContainer>
    </Box>
  )
}
