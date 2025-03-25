import { Convite } from '@prisma/client'
import { Check, X } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'

export function InvitationList({ invitations }: { invitations: Convite[] }) {
  return (
    <div>
      <div>
        {invitations.length === 0 && <div>Nenhum convite encontrado</div>}
      </div>
      {invitations.length > 0 && (
        <div className='grid grid-cols-2 gap-2'>
          {invitations
            .sort((a, b) => a.convidado?.localeCompare(b.convidado))
            .map((inv) => (
              <Card
                key={inv.id}
                data-confirmou={inv.confirmou_presenca}
                className='justify-between data-[confirmou="true"]:border-green-600/50'
              >
                <CardHeader className='flex items-center justify-between'>
                  <CardTitle className='text-sm'>{inv.convidado}</CardTitle>
                  <CardDescription className='font-mono'>
                    {inv.codigo}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className='flex items-center gap-2 text-sm'>
                    <div className='font-bold'>Nome do convidado</div>
                    <div className='h-1 flex-1 whitespace-nowrap border-b border-dotted border-muted-foreground' />
                    <div className='truncate'>
                      {inv.representante ?? (
                        <span className='font-mono opacity-60'>n/a</span>
                      )}
                    </div>
                  </div>
                  {inv.possui_acompanhante && (
                    <div className='flex items-center gap-2 text-sm'>
                      <div className='font-bold'>Nome do acompanhante</div>
                      <div className='h-1 flex-1 whitespace-nowrap border-b border-dotted border-muted-foreground' />
                      <div className='truncate'>
                        {inv.nome_acompanhante ?? (
                          <span className='font-mono opacity-60'>n/a</span>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>

                <CardFooter className='flex justify-end'>
                  <div className='text-sm'>
                    {inv.confirmou_presenca ? (
                      <div className='flex font-bold p-1 text-green-600 items-center gap-2'>
                        <span>confirmou</span>
                        <Check size='0.9em' />
                      </div>
                    ) : (
                      <div className='flex p-1 items-center gap-2'>
                        <span>não confirmou</span>
                        <X size='0.9em' />
                      </div>
                    )}
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>
      )}
    </div>
  )
}
