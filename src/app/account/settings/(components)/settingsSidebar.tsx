import SidebarLink from '@/components/buttons/sidebarLink'
import Image from 'next/image'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { BellIcon } from 'lucide-react'

export default function SettingsSidebar() {
  return (
    <Sidebar variant="floating">
      <SidebarHeader>
        <SidebarMenuItem>
          <Image
            src="/assets/coca_head.png"
            alt="logo"
            width={96}
            height={52}
            className="border-2 rounded-xl min-w-[6rem] w-[6rem] h-[3.20rem] object-cover bg-red-950"
          />
        </SidebarMenuItem>
        <SidebarMenuItem>
          <span className="text-yellow-500 font-bold text-lg">
            Canal do Coca
          </span>
        </SidebarMenuItem>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Configurações da conta</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuButton asChild>
              <SidebarLink href="/account">Dashboard</SidebarLink>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <SidebarLink href="/account/settings/connect">
                Conectar contas
              </SidebarLink>
            </SidebarMenuButton>

            <SidebarMenuButton asChild>
              <SidebarLink href="/account/settings">
                Dados de acesso
              </SidebarLink>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Interação com Canal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuButton asChild>
              <SidebarLink
                href="/account/suggestvideo"
                className="line-through"
                title="Em desenvolvimento"
              >
                Sugerir um vídeo
              </SidebarLink>
            </SidebarMenuButton>
            <SidebarMenuButton asChild>
              <SidebarLink
                href="/account/suggestvideo"
                className="line-through"
                title="Em desenvolvimento"
              >
                Mensagem em live
              </SidebarLink>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuButton asChild>
            <SidebarLink href="/account/settings/notifications">
              <BellIcon />
              Notificações
            </SidebarLink>
          </SidebarMenuButton>
          {/* <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem> */}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
