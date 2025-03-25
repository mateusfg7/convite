'use client'

import { Convite } from '@prisma/client'
import { useEffect, useState } from 'react'

import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

import { toast } from 'sonner'
import { updateInvitation } from '../../actions/update-invitation'

import { Check, Loader2, Stars } from 'lucide-react'
import { getInvitation } from '~/actions/get-invitation'

export function ConfirmationCard({
  code,
  onFinish,
}: {
  code: string
  onFinish: () => void
}) {
  const [convite, setConvite] = useState<Convite>()
  const [nome, setNome] = useState('')
  const [acompanhante, setAcompanhante] = useState('')

  function handleSubmit() {
    if (!nome || nome.length < 2) {
      toast.error('Nome inválido!')
      return
    }

    toast.promise(
      () =>
        updateInvitation(code, {
          representante: nome.trim().toUpperCase(),
          nome_acompanhante:
            acompanhante.length > 0
              ? acompanhante.trim().toUpperCase()
              : undefined,
          confirmou_presenca: true,
        }),
      {
        loading: 'Confirmando presença...',
        success: () => {
          setNome('')
          onFinish()
          return 'Presença confirmado!'
        },
        error: (err) => 'Erro ao confirmar nome!',
        richColors: true,
      }
    )
  }

  async function fetchInvitation() {
    const invitation = await getInvitation(code)

    if (invitation) {
      setConvite(invitation)

      if (invitation.representante) {
        setNome(invitation.representante)
      }

      if (invitation.nome_acompanhante) {
        setAcompanhante(invitation.nome_acompanhante)
      }
    } else {
      toast.error('Convite não encontrado!')
      onFinish()
    }
  }
  useEffect(() => {
    fetchInvitation()
  }, [])

  if (!convite) {
    return (
      <div className='flex items-center gap-2'>
        <Loader2 size='1em' className='animate-spin' />
        <span>Carregando convite</span>
      </div>
    )
  }

  return (
    <Card className='max-w-[400px] w-full space-y-1'>
      <CardHeader className='flex flex-wrap items-center justify-between'>
        <CardTitle>BrSuper</CardTitle>
        {!convite.convite_especial && (
          <CardDescription>Confirmação de nome</CardDescription>
        )}
        {convite.convite_especial && (
          <CardDescription>
            <div className='flex items-center gap-2'>
              <span>Convite especial</span>
              <Stars size='1em' />
            </div>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className='space-y-2'>
        {!convite.convite_especial && (
          <div className='text-center p-1'>
            <div className='text-sm'>Convite em nome de</div>
            <div className='font-semibold text-lg'>
              {convite.convidado.trim().toUpperCase()}
            </div>
          </div>
        )}

        <div className='h-1 w-full border-b border-neutral-400 border-dashed' />

        <div className='space-y-4 p-4'>
          <div className='space-y-2'>
            <Label htmlFor='nome' className='text-center'>
              <span className='w-full'>
                {!convite.convite_especial &&
                  'Confirme seu nome ou de um representante'}
                {convite.convite_especial && 'Confirme seu nome completo'}
              </span>
            </Label>
            <Input
              placeholder='SEU NOME COMPLETO'
              id='nome'
              className='text-center'
              value={nome}
              onChange={(e) => setNome(e.target.value.toUpperCase())}
            />
          </div>

          {convite.possui_acompanhante && (
            <div className='space-y-2'>
              <Label htmlFor='acompanhante' className='text-center'>
                <span className='w-full'>
                  Adicione o nome de um acompanhante
                </span>
              </Label>
              <Input
                placeholder='NOME COMPLETO'
                className='text-center'
                id='acompanhante'
                value={acompanhante}
                onChange={(e) => setAcompanhante(e.target.value.toUpperCase())}
              />
            </div>
          )}
        </div>

        <div className='h-1 w-full border-b border-neutral-400 border-dashed' />
      </CardContent>
      <CardFooter>
        <Button
          onClick={handleSubmit}
          className='w-full hover:cursor-pointer hover:bg-green-600 active:bg-green-500'
        >
          <span>Confirmar presença</span>
          <Check />
        </Button>
      </CardFooter>
    </Card>
  )
}
