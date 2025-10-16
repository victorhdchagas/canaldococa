'use client'
import Link, { LinkProps } from 'next/link'
import React, { ComponentProps, ReactNode } from 'react'
import { useSidebar } from '../ui/sidebar'
interface ActionLinkProps extends LinkProps, Omit<ComponentProps<'a'>, 'href'> {
  children: ReactNode
  className?: string
}
export default function SidebarLink(props: ActionLinkProps) {
  const { toggleSidebar, state } = useSidebar()
  return (
    <Link
      {...props}
      onClick={() => {
        console.log(state)
        toggleSidebar()
      }}
    >
      {props.children}
    </Link>
  )
}
