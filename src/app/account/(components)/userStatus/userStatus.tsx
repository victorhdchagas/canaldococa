import Box from '@/components/boxes/box'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

interface ResponseProps {
  name: string
  progress: { level: number; currentXP: number; nextLevel: number }
  tags: string[]
  connections: {
    youtube: boolean
    discord: boolean
    kick: boolean
  }
}

interface UserStatusProps {
  user: ResponseProps
}

export default function UserStatus({ user }: UserStatusProps) {
  return (
    <Box title="Status" className="h-[360px]">
      <div className="flex justify-start gap-2 items-end text-gray-300 select-none ">
        <div className="border border-gray-500 border-dashed  w-min px-4 py-2 rounded-lg relative z-20 bg-gradient-to-b from-gray-900 to-gray-950">
          <div className="absolute bg-gradient-to-b from-gray-900/70 to-gray-950/70 z-10 top-0 left-0 w-full h-full scale-120 animate-pulse rounded-lg ">
            {' '}
          </div>
          <div className="absolute text-xs font-mono -top-0.5 left-1 z-20">
            Level
          </div>
          <div className="relative z-20 text-xl font-mono font-bold">
            {user.progress.level}
          </div>
        </div>
        <span>{user.name} </span>
      </div>

      <div className="w-full mb-1 select-none">
        <h2 className="text-sm ">Experiência</h2>
        <Progress
          value={(user.progress.currentXP / user.progress.nextLevel) * 100}
          className=""
        />
        <span className="text-xs text-gray-500">
          {user.progress.currentXP}xp de {user.progress.nextLevel}xp
        </span>
      </div>

      <div className="w-full mb-2 select-none">
        <h2 className="text-sm ">Tags</h2>
        <div className="flex gap-0.5">
          {user.tags.map((tag) => (
            <Badge variant="default" key={tag}>
              {tag}
            </Badge>
          ))}
        </div>
      </div>
      <div className="w-full select-none">
        <span className="text-sm block mb-1">Conexões</span>

        <div className="grid grid-cols-3 font-semibold text-gray-400 text-xs border-b border-gray-600/50 pb-1 mb-1">
          <span>Nome</span>
          <span>Status</span>
          <span className="text-right">Comando</span>
        </div>

        {/* Lista de Conexões (Grid de 3 Colunas) */}
        <ul className="text-gray-300 text-sm space-y-2">
          <li className="grid grid-cols-3">
            <span>Youtube</span>
            <span
              className={
                user.connections.youtube ? 'text-green-400' : 'text-red-400'
              }
            >
              {user.connections.youtube ? 'Conectado' : 'Desconectado'}
            </span>
            <span className="text-right text-blue-400 cursor-pointer hover:text-blue-300">
              {user.connections.youtube ? '/disconnect' : '/connect'}
            </span>
          </li>

          <li className="grid grid-cols-3">
            <span>Discord</span>
            <span
              className={
                user.connections.discord ? 'text-green-400' : 'text-red-400'
              }
            >
              {user.connections.discord ? 'Conectado' : 'Desconectado'}
            </span>
            <span className="text-right text-blue-400 cursor-pointer hover:text-blue-300">
              {user.connections.discord ? '/disconnect' : '/connect'}
            </span>
          </li>
          <li className="grid grid-cols-3">
            <span>Kick</span>
            <span
              className={
                user.connections.kick ? 'text-green-400' : 'text-red-400'
              }
            >
              {user.connections.kick ? 'Conectado' : 'Desconectado'}
            </span>
            <span className="text-right text-blue-400 cursor-pointer hover:text-blue-300">
              {user.connections.kick ? '/disconnect' : '/connect'}
            </span>
          </li>
        </ul>
      </div>
    </Box>
  )
}
