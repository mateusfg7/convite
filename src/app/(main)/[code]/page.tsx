'use client'

import { useRouter } from 'next/navigation'
import { ConfirmationCard } from '../_components/update-name'
import { use } from 'react'

export default function Page({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const { code } = use(params)
  const router = useRouter()

  return <ConfirmationCard code={code} onFinish={() => router.push('/')} />
}
