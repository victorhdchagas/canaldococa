import Box from '@/components/boxes/box'

export default function UserStatusSkeleton() {
  return (
    <Box title="Status" className="h-[360px]">
      <div className="flex justify-start gap-2 items-end text-gray-300 select-none animate-pulse">
        <div className="border border-gray-500 border-dashed w-[60px] h-[40px] rounded-lg relative bg-gray-700/50">
          <div className="relative z-20 text-xl font-mono font-bold pt-1.5 pl-3">
            <div className="h-5 w-4 bg-gray-600 rounded"></div>{' '}
          </div>
        </div>

        <span className="h-6 w-32 bg-gray-700 rounded-md"> </span>
      </div>

      <div className="w-full mb-1 select-none animate-pulse">
        <h2 className="text-sm h-4 w-20 bg-gray-700 rounded-sm mb-1"></h2>
        <div className="h-2 w-full bg-gray-700 rounded-full"></div>
        <span className="text-xs text-gray-500 h-3 w-28 mt-1 block bg-gray-700 rounded-sm"></span>
      </div>

      <div className="w-full mb-2 select-none animate-pulse">
        <h2 className="text-sm h-4 w-10 bg-gray-700 rounded-sm mb-1"></h2>
        <div className="flex gap-1">
          <div className="h-5 w-12 bg-gray-700 rounded-lg"></div>
          <div className="h-5 w-16 bg-gray-700 rounded-lg"></div>
          <div className="h-5 w-10 bg-gray-700 rounded-lg"></div>
        </div>
      </div>

      <div className="w-full select-none">
        <span className="text-sm block mb-2 h-4 w-20 bg-gray-700 rounded-sm animate-pulse"></span>

        <div className="grid grid-cols-3 font-semibold text-gray-400 text-xs border-b border-gray-600/50 pb-1 mb-1">
          <span>Nome</span>
          <span>Status</span>
          <span className="text-right">Comando</span>
        </div>

        <ul className="text-gray-300 text-sm space-y-2 animate-pulse">
          <li className="grid grid-cols-3 h-4">
            <div className="w-14 bg-gray-700 rounded-sm"></div>
            <div className="w-16 bg-gray-700 rounded-sm"></div>
            <div className="w-16 bg-gray-700 rounded-sm justify-self-end"></div>
          </li>
          <li className="grid grid-cols-3 h-4">
            <div className="w-12 bg-gray-700 rounded-sm"></div>
            <div className="w-16 bg-gray-700 rounded-sm"></div>
            <div className="w-16 bg-gray-700 rounded-sm justify-self-end"></div>
          </li>
          <li className="grid grid-cols-3 h-4">
            <div className="w-10 bg-gray-700 rounded-sm"></div>
            <div className="w-16 bg-gray-700 rounded-sm"></div>
            <div className="w-16 bg-gray-700 rounded-sm justify-self-end"></div>
          </li>
        </ul>
      </div>
    </Box>
  )
}
