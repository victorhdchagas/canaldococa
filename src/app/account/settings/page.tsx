import Box from '@/components/boxes/box'
import UserSettingsForm from './(components)/settingsForm'
import GridContainer from '@/components/Page/GridContainer'

export default function SettingsRootpage() {
  return (
    <Box
      title="Dados da conta"
      subtitle="Informações sobre sua conta e dados de exibição."
      className="self-center md:max-w-xl"
    >
      <GridContainer className="gap-2 md:grid-cols-1">
        <UserSettingsForm />
      </GridContainer>
    </Box>
  )
}
