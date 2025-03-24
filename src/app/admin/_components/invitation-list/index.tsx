import { Convite } from '@prisma/client'
import { Check, Stars, X } from 'lucide-react'

export function InvitationList({ invitations }: { invitations: Convite[] }) {
  return (
    <div>
      <div>
        {invitations.length === 0 && <div>Nenhum convite encontrado</div>}
      </div>
      {invitations.length > 0 && (
        <div className='space-y-2'>
          {invitations
            .sort((a, b) => a.convidado?.localeCompare(b.convidado))
            .map((inv) => (
              <div className='border border-border bg-blue-500/10h hover:brightness-150 flex gap-5 justify-between p-3 rounded-md'>
                <div className='flex items-center gap-5'>
                  <div className='font-mono truncate'>{inv.codigo}</div>
                  <div>
                    {inv.convidado ?? (
                      <div className='flex items-center gap-2 text-yellow-400'>
                        <span>Special</span>
                        <Stars size='1em' />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  {inv.confirmou_presenca ? (
                    <div className='flex font-bold p-1 text-green-600 items-center gap-2'>
                      <span>Confirmou</span>
                      <Check size='1em' />
                    </div>
                  ) : (
                    <div className='flex p-1 text-red-600 items-center gap-2'>
                      <span>Não confirmou</span>
                      <X size='1em' />
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  )
}
