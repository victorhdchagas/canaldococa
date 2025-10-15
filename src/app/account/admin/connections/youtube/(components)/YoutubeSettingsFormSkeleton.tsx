import { Wifi01FreeIcons } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'

const SkeletonLine = ({
  width = 'w-3/4',
  height = 'h-4',
  className = 'rounded-md',
}) => <div className={`bg-gray-700/80 ${width} ${height} ${className}`}></div>

const SkeletonInputGroup = ({ unit = false }) => (
  <div className="flex flex-col gap-2 w-full p-2 bg-gray-900 rounded-lg">
    <div className="flex justify-between items-center">
      {/* Label Placeholder */}
      <SkeletonLine width="w-1/3" height="h-3" className="rounded-sm" />
      {/* Icon Placeholder */}
      <SkeletonLine width="w-5 h-5" className="rounded-full" />
    </div>
    <div className="flex items-center gap-2">
      {/* Input Placeholder */}
      <SkeletonLine height="h-9" className="w-full rounded-sm" />
      {/* Unit Placeholder (if present) */}
      {unit && (
        <SkeletonLine width="w-10" height="h-4" className="rounded-sm" />
      )}
    </div>
  </div>
)

const SkeletonSwitchGroup = () => (
  <div className="flex flex-col gap-2 w-full p-2 bg-gray-900 rounded-lg">
    <div className="flex justify-between items-center">
      {/* Label Placeholder */}
      <SkeletonLine width="w-2/5" height="h-3" className="rounded-sm" />
      {/* Icon Placeholder */}
      <SkeletonLine width="w-5 h-5" className="rounded-full" />
    </div>
    {/* Switch Placeholder */}
    <div className="w-[42px] h-[25px] bg-gray-700 rounded-full mt-1 relative overflow-hidden">
      {/* Thumb Placeholder - visually indicating the switch structure */}
      <div className="absolute top-0.5 left-0.5 w-[21px] h-[21px] bg-white/70 rounded-full"></div>
    </div>
  </div>
)

const SkeletonButton = ({ width = 'w-28' }) => (
  <div className={`h-9 ${width} bg-gray-700/80 rounded-md`}></div>
)

export default function YoutubeSettingsSkeleton() {
  return (
    <div className="animate-pulse flex flex-col gap-6 px-1 md:p-4 rounded-lg bg-gradient-to-b from-gray-900 to-gray-950 shadow-l w-full max-w-4xl mx-auto pb-4">
      <section className="p-4 bg-gray-900 shadow-m rounded-md border border-gray-700 relative overflow-hidden">
        <SkeletonLine width="w-1/2" height="h-6" className="rounded-md mb-2" />
        <SkeletonLine width="w-2/5" height="h-3" className="rounded-sm mb-1" />
        <SkeletonLine width="w-3/5" height="h-3" className="rounded-sm mb-4" />

        <div className="mt-4 flex gap-3">
          <SkeletonButton width="w-32" />
          <SkeletonButton width="w-24" />

          <HugeiconsIcon
            icon={Wifi01FreeIcons}
            size={96}
            className="absolute rotate-45 opacity-20 scale-125 top-8 right-6 md:top-10  md:right-10"
          />
        </div>
      </section>

      <section className="p-4 bg-gray-900 shadow-m rounded-md border border-gray-700">
        <SkeletonLine width="w-2/3" height="h-6" className="rounded-md mb-4" />

        <SkeletonSwitchGroup />

        <div className="grid md:grid-cols-3 gap-4 mt-4">
          <SkeletonInputGroup unit={true} />
          <SkeletonInputGroup unit={true} />
          <SkeletonInputGroup unit={true} />
          <SkeletonInputGroup unit={true} />{' '}
        </div>

        <div className="mt-6 mb-3 border-b border-gray-700 pb-1">
          <SkeletonLine width="w-1/2" height="h-5" className="rounded-md" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <SkeletonInputGroup unit={true} />
          <SkeletonInputGroup unit={true} />
        </div>
      </section>

      <section className="p-4 bg-gray-900 rounded-md border border-gray-700">
        <SkeletonLine width="w-2/3" height="h-6" className="rounded-md mb-4" />

        <div className="grid md:grid-cols-2 gap-4">
          <SkeletonInputGroup unit={false} />
        </div>
      </section>

      <div className="flex justify-end pt-4 gap-4 px-2">
        <SkeletonButton width="w-20" />
        <SkeletonButton width="w-36" />
      </div>
    </div>
  )
}
