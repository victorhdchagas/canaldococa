import Link from 'next/link'
import { Button } from './ui/button'

export default function LoginButton() {
  return (
    <Button asChild variant="outline">
      <Link href="/login">Login</Link>
    </Button>
  )
}
