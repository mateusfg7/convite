'use client'

import { useState } from 'react'
import { ValidateCard } from './_components/validate-card'
import { ConfirmationCard } from './_components/update-name'

import logoDesc from '~/assets/logo-description.png'
import Image from 'next/image'

export default function Home() {
  const [validatedCode, setValidatedCode] = useState<string | undefined>()

  return (
    <div className='flex items-center flex-col justify-center h-dvh gap-10 p-2'>
      <Image
        src={logoDesc}
        alt=''
        className='absolute w-[70rem] opacity-60 z-0 blur-3xl'
      />
      <Image src={logoDesc} alt='' className='w-52 z-50' />
      {!validatedCode && <ValidateCard onValidate={setValidatedCode} />}
      {validatedCode && (
        <ConfirmationCard
          code={validatedCode}
          onFinish={() => setValidatedCode('')}
        />
      )}
    </div>
  )
}
