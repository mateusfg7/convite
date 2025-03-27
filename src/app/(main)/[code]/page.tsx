'use client'

import { useRouter } from 'next/navigation'
import { ConfirmationCard } from '../_components/update-name'

export default function Page({ params }: { params: { code: string } }) {
  const router = useRouter()

  return (
    <ConfirmationCard code={params.code} onFinish={() => router.push('/')} />
  )
}
