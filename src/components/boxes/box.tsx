import { ComponentProps } from 'react'
import Subtitle from '../text/subtitle'
import MainDivisor from '../divisors/maindivisor'
import { twMerge } from 'tailwind-merge'

interface BoxProps extends ComponentProps<'div'> {
  title: string
  subtitle?: string
  showShadow?: boolean
}
export default function Box({
  title,
  subtitle,
  children,
  className,
  showShadow = true,
  ...props
}: BoxProps) {
  return (
    <div
      className={twMerge(
        'flex flex-col mb-2 mx-auto md:mx-0 px-4 md:p-4 pt-2 rounded-lg bg-gradient-to-b from-gray-900 to-gray-950 w-full pb-4  max-w-sm md:max-w-sm ',
        showShadow ? 'shadow-l' : '',
        className,
      )}
      {...props}
    >
      <Subtitle>{title}</Subtitle>
      {subtitle && (
        <span className="text-sm font-normal text-gray-400  pb-1">
          {subtitle}
        </span>
      )}
      <MainDivisor />
      {children}
    </div>
  )
}
