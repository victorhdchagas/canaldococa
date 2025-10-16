import { ComponentProps } from 'react'
import Subtitle from '../text/subtitle'
import MainDivisor from '../divisors/maindivisor'
import { twMerge } from 'tailwind-merge'

interface BoxProps extends ComponentProps<'div'> {
  title: string
  subtitle?: string
}
export default function Box({
  title,
  subtitle,
  children,
  className,
  ...props
}: BoxProps) {
  return (
    <div
      className={twMerge(
        'flex flex-col mb-2 mx-auto md:mx-0 px-4 md:p-4 pt-2 rounded-lg bg-gradient-to-b from-gray-900 to-gray-950 shadow-l w-full pb-4  max-w-sm md:max-w-sm ',
        className,
      )}
      {...props}
    >
      <Subtitle>{title}</Subtitle>
      {subtitle && <span className="text-sm text-gray-500  ">{subtitle}</span>}
      <MainDivisor />
      {children}
    </div>
  )
}
