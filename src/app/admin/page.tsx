'use client'

import { useEffect, useState } from 'react'
import ExportGuestsCSV from './_components/export-csv'
import { InvitationList } from './_components/invitation-list'
import { listInvitations } from '../../actions/list-invitations'
import { Convite } from '@prisma/client'
import { toast } from 'sonner'
import { Check, Ticket, UserRound } from 'lucide-react'

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

  const confirmados = invitations.filter((c) => c.confirmou_presenca)
  const pessoasConfirmadas = confirmados.reduce((acc, c) => {
    let sum = acc

    if (c.representante) sum++
    if (c.nome_acompanhante) sum++

    return sum
  }, 0)

  return (
    <div className='flex flex-1 flex-col gap-4 p-4'>
      <div className='flex justify-between'>
        <div className='flex items-center gap-4'>
          <div className='flex items-center gap-2'>
            <Ticket size='1em' />
            <span>{invitations.length} convites</span>
          </div>

          <div className='flex items-center gap-2'>
            <Check size='1em' />
            <span>{confirmados.length} confirmados</span>
          </div>

          <div className='flex items-center gap-2'>
            <UserRound size='1em' />
            <span>{pessoasConfirmadas} pessoas </span>
            <span className='text-xs opacity-50'>
              (convidados + acompanhante)
            </span>
          </div>
        </div>

        <ExportGuestsCSV data={invitations} />
      </div>
      <InvitationList invitations={invitations} />
    </div>
  )
}
