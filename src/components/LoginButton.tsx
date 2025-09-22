import Link from 'next/link'

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="text-base font-bold font-mono p-1.5 px-3 bg-gray-950 text-yellow-500 border rounded-full border-yellow-900 mr-2"
    >
      Login
    </Link>
  )
}
