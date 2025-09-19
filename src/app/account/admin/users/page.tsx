import HeaderSection from '@/components/headerSection/headerSection'
import PaymentUserList from './(components)/userList'
import SearchUserFilter from './(components)/searchUserFilter'

export default async function UserPage({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string }>
}) {
  const query = await searchParams

  return (
    <div className="font-sans bg-gray-900 gap-4 flex flex-col h-screen text-white  mx-auto ">
      <HeaderSection />
      <span className="text-yellow-500 text-2xl font-bold text-shadow-xs text-shadow-amber-400 container mx-auto">
        Lista de apoiadores
      </span>
      <SearchUserFilter />
      <section className="container mx-auto">
        <PaymentUserList query={query?.query} />
      </section>
    </div>
  )
}
