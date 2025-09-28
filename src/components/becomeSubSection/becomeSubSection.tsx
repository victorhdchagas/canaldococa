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
          {data
            .sort(
              (a: any, b: any) =>
                a.defaultPrice.unit_amount - b.defaultPrice.unit_amount,
            )
            .map((product: any) => (
              <div
                key={product.name}
                className="border border-gray-700 grow
                rounded-lg p-4 pt-2 md:self-stretch flex-1 
                bg-gradient-to-b from-gray-950 to-gray-800
                
                gap-2
                flex flex-col justify-between items-center"
              >
                <h3 className="font-mono text-xl font-semibold text-yellow-400 text-shadow-md text-shadow-yellow-700 w-full text-left">
                  {product.name}
                </h3>
                <img
                  className="md:block hidden  object-cover h-48 w-48 rounded-md border drop-shadow-red-700 drop-shadow-md"
                  src={product.images[0]}
                />
                <p className="grow font-medium">{product.description}</p>
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
                  <a
                    href={'#'}
                    className="text-md font-semibold transition-all
            border rounded-sm hover:rounded-br-xl px-2 py-1 bg-yellow-500 text-gray-900 hover:bg-yellow-600 hover:animate-pulse"
                    target="_blank"
                  >
                    Comprar
                  </a>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
