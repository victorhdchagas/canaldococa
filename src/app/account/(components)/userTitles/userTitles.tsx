import Box from '@/components/boxes/box'
import React from 'react'
import { twMerge } from 'tailwind-merge'

export default function UserTitles() {
  const titles = [
    {
      id: 1,
      description: 'A lenda',
      adquiredAt: '2021-04-04',
      type: 'normal',
      isActive: true,
    },
    {
      id: 2,
      description: 'Iniciante',
      adquiredAt: '2021-04-04',
      type: 'normal',
      isActive: false,
    },
    {
      id: 4,
      description: 'Apoiador',
      adquiredAt: '2021-04-04',
      type: 'normal',
      isActive: false,
    },
    {
      id: 5,
      description: 'Santa Madre Cassino',
      adquiredAt: '2021-04-04',
      type: 'normal',
      isActive: false,
    },
    {
      id: 6,
      description: 'Rogério Skylab',
      adquiredAt: '2021-04-04',
      type: 'normal',
      isActive: false,
    },
  ]
  return (
    <Box className=" h-auto overflow-auto" title="Titulos">
      {titles.length == 0 && <div>Ops, você ainda não tem títulos</div>}
      {titles.map((title) => (
        <div
          className={twMerge(
            'flex flex-col min-h-20 w-full justify-center shadow-s rounded-lg bg-gradient-to-b from-gray-800 to-gray-900 px-2 mb-2 group select-none',
            title.isActive ? 'border-2 border-dashed border-gray-600' : '',
          )}
          key={title.id}
        >
          <span
            className={twMerge(
              'text-2xl font-bold group-hover:text-gray-300 ',
              title.isActive ? 'text-gray-400 ' : 'text-gray-500  ',
            )}
          >
            {title.description}
          </span>
          <div className="flex justify-between">
            <span className="text-gray-500 self-start font-mono text-xs">
              {title.adquiredAt}
            </span>
            {title.isActive && (
              <span className="text-emerald-700 self-end font-mono text-xs">
                Selecionado
              </span>
            )}
          </div>
        </div>
      ))}
    </Box>
  )
}
