import Link from 'next/link'
import LoginButton from '../LoginButton'
import { User } from '@/types/services'
import ContextMenu from './ContextMenu'

export default async function HeaderSection({
  authenticated,
}: {
  authenticated?: User
}) {
  return (
    <header className="grid grid-cols-4  bg-gray-900 text-2xl font-bold text-black  items-center h-[4.25rem] md:container md:mx-auto ">
      <div className="flex flex-row items-center justify-start gap-1 text-yellow-500 col-span-1 text-2xl">
        <Link href="/">
          <img
            src="assets/coca_head.png"
            className="border-2 rounded-xl w-[6rem] h-[3.20rem] object-cover bg-red-950"
          />
        </Link>
      </div>
      <span className="justify-start gap-1 text-yellow-500 col-span-2 text-2xl text-center ">
        Canal do Coca
      </span>
      <div className="flex justify-end col-span-1">
        {!authenticated && <LoginButton />}
        {authenticated && <ContextMenu userAvatar={authenticated.avatar} />}
      </div>
    </header>
  )
}
