'use client'

import { useEffect, useState } from 'react'
import ExportGuestsCSV from './_components/export-csv'
import { InvitationList } from './_components/invitation-list'
import { listInvitations } from './_lib/list-invitations'
import { Convite } from '@prisma/client'
import { toast } from 'sonner'

export default function Page() {
  const [invitations, setInvitations] = useState<Convite[]>([])

  async function getInvitations() {
    await listInvitations()
      .then((list) => setInvitations(list))
      .catch((error) => {
        console.error(error)
        toast.error('Erro ao carregar convites.')
      })
  }

  useEffect(() => {
    getInvitations()
  }, [])

  return (
    <div className='flex flex-1 flex-col gap-4 p-4'>
      <div className='flex justify-end'>
        <ExportGuestsCSV data={invitations} />
      </div>
      <InvitationList invitations={invitations} />
    </div>
  )
}
