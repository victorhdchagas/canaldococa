import React from 'react'

export default function PageContainer({ children }: React.PropsWithChildren) {
  return (
    <div className="font-sans bg-gray-900 flex flex-col h-screen  text-white  mx-auto md:justify-start container">
      {children}
    </div>
  )
}
