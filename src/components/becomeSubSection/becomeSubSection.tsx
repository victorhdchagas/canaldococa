import React from 'react'
import Title from '../text/title'
import Subtitle from '../text/subtitle'

export default async function BecomeSubscriberSection() {
  const [response] = await Promise.all([
    fetch(`${process.env.API_BASEURL}/payments/products`, {
      method: 'GET',
      credentials: 'include',
    }),
  ])
  const data = await response.json()

  if (!data || data.length === 0) {
    return null
  }
  return (
    <section
      id="plans"
      className="bg-gradient-to-b to-gray-800 from-gray-900 select-none
       p-8 "
    >
      <div
        className="flex flex-col items-start gap-4 not-first:gap-0 
      md:container md:mx-auto"
      >
        <Title>Torne-se membro</Title>
        <Subtitle>Faça parte da nossa família</Subtitle>

        <div
          className="text-gray-300 gap-4 
        md:w-full items-stretch
        self-stretch
      flex flex-col md:flex-row "
        >
          {data.map((product: any) => (
            <div
              key={product.id}
              className="border border-gray-700 grow
                rounded-lg p-4 md:self-stretch flex-1 
                bg-gradient-to-b from-gray-950 to-gray-800
                flex flex-col justify-between items-center"
            >
              <h3 className="text-xl font-semibold text-yellow-400">
                {product.name}
              </h3>
              <img
                className="md:block hidden  object-cover h-48 w-48"
                src={product.images[0]}
              />
              <p className="grow ">{product.description}</p>
              <div className="flex flex-row pt-2 md:flex-col items-end justify-between self-stretch">
                <div>
                  <span className="text-2xl font-bold text-yellow-500">
                    {(product.defaultPrice.unit_amount / 100).toLocaleString(
                      'pt-BR',
                      { style: 'currency', currency: 'BRL' },
                    )}
                  </span>
                  <span className="text-xs text-gray-400"> / mês</span>
                </div>
                <div>Comprar</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
