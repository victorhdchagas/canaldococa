import Box from '@/components/boxes/box'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'
import XPTable from '@/components/xpTable'

interface ResponseProps {
  name: string
  avatar: string
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
    <Box title="Status" className="md:max-w-[360px] max-h-min border pb-2">
      <div className="flex gap-2 items-start p-2 py-4">
        <Avatar className="w-20 h-20">
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="text-xl font-bold text-primary text-wrap px-2 pr-4 pt-4 flex-3 first-letter:uppercase">
          {user.name}
        </span>
        <div className="flex flex-col relative flex-1">
          <span className="text-muted-foreground text-xs">Level</span>
          <span className="text-primary font-bold text-2xl">
            {user.progress.level}
          </span>
        </div>
      </div>
      <div className="flex flex-col flex-1 relative mt-4">
        <div className="w-full h-3 z-0 bg-muted rounded-lg"></div>
        <div
          className="absolute h-3 shadow-[0_0_2px_1px] shadow-primary top-0 left-0 z-10 bg-primary rounded-lg"
          style={{ width: `${(450 / 500) * 100}%` }}
        ></div>
        <div className="w-full flex justify-between pt-1">
          <div className="text-foreground text-sm">
            {user.progress.nextLevel}xp{' '}
            <span className="text-xs text-muted-foreground font-light ">
              para o próximo nível
            </span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground font-semibold h-auto p-0">
                Ver tabela
              </Button>
            </SheetTrigger>
            <SheetContent>
              <VisuallyHidden>
                <SheetTitle>Tabela de Experiência</SheetTitle>
              </VisuallyHidden>
              <XPTable currentLevel={user.progress.level} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
      <div className="flex gap-1 justify-start mt-6 select-none flex-wrap">
        {user.tags.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
    </Box>
  )
}
