'use client'

import { useState } from 'react'
import { ValidateCard } from './_components/validate-card'
import { ConfirmationCard } from './_components/update-name'

export default function Home() {
  const [validatedCode, setValidatedCode] = useState<string | undefined>()

  return (
    <div className='flex items-center justify-center h-dvh p-2'>
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
