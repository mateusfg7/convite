import Image from 'next/image'
import { CardHeader, CardTitle } from '~/components/ui/card'

import logo from '~/assets/logo.png'

export const CustomCardHeader = ({
  children,
}: {
  children: React.ReactNode
}) => (
  <CardHeader className='flex flex-wrap items-center justify-between'>
    <CardTitle>
      <Image src={logo} alt='BrSuper' className='w-20' />
    </CardTitle>
    {children}
  </CardHeader>
)
