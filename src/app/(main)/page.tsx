'use client'

import Image from 'next/image'
import Video from 'next-video'

import logoDesc from '~/assets/logo-description.png'
import { ValidateCard } from './_components/validate-card'

export default function Home() {
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-2 items-center text-center flex-col justify-center min-h-dvh gap-14 md:gap-y-0 px-5 py-10 md:py-0 pb-32 z-50 place-items-center '>
        <div className='rounded-md shadow-2xl md:row-span-4 order-3 md:order-1'>
          <div className='max-w-[calc(var(--spacing)*90)] rounded-md overflow-hidden'>
            <Video autoPlay src='/evento/brsuper-bicampea.mp4' />
          </div>
        </div>

        <Image src={logoDesc} alt='' className='w-52 mt-auto order-1' />

        <p className='max-w-80 text-center text-[#3280BE] drop-shadow-lg text-balance font-semibold text-lg animate-blur-in order-2'>
          Bicampeã! A{' '}
          <span className='font-extrabold border-b px-y border-[#3280BE]/30'>
            melhor internet
          </span>{' '}
          do Brasil mais uma vez!
        </p>

        <div className='order-4 w-full'>
          <ValidateCard />
        </div>

        <div className='hidden md:block md:order-5' />
      </div>
    </div>
  )
}
