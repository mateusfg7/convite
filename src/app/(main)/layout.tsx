import Image from 'next/image'

import logoDesc from '~/assets/logo-description.png'

export default function PageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='min-h-dvh flex items-center justify-center'>
      <Image
        src={logoDesc}
        alt=''
        className='fixed w-[100rem] opacity-50 md:opacity-35 -z-50 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
      />
      <div>{children}</div>
    </div>
  )
}
