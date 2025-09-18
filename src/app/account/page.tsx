import HeaderSection from '@/components/headerSection/headerSection'
import ProductList from './(components)/produtlist'
import { getUser } from '@/core/cookie.service'

export default async function HelloWorld() {
  const user = await getUser()
  return (
    <div className="font-sans bg-gray-900 gap-4 flex flex-col h-screen">
      <HeaderSection authenticated={user} />
      <ProductList />
    </div>
  )
}
