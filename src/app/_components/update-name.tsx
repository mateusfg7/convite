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
import { getInvitation } from '../_lib/get-invitation'
import { toast } from 'sonner'
import { updateName } from '../_lib/update-name'

import { Loader2, Stars } from 'lucide-react'

export function UpdateName({
  code,
  onFinish,
}: {
  code: string
  onFinish: () => void
}) {
  const [convite, setConvite] = useState<Convite>()
  const [nome, setNome] = useState('')

  function handleSubmit() {
    if (!nome || nome.length < 2) {
      toast.error('Nome inválido!')
      return
    }

    toast.promise(() => updateName(code, nome), {
      loading: 'Confirmando nome...',
      success: () => {
        setNome('')
        onFinish()
        return 'Nome confirmado!'
      },
      error: (err) => 'Erro ao confirmar nome!',
    })
  }

  async function fetchInvitation() {
    const invitation = await getInvitation(code)

    if (invitation) {
      setConvite(invitation)

      if (invitation.convidado) {
        setNome(invitation.convidado)
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
    <Card className='max-w-[400px] w-full'>
      <CardHeader className='flex flex-wrap items-center justify-between'>
        <CardTitle>BrSuper</CardTitle>
        {!convite.especial && (
          <CardDescription>Confirmação de nome</CardDescription>
        )}
        {convite.especial && (
          <CardDescription>
            <div className='flex items-center gap-2'>
              <span>Convite especial</span>
              <Stars size='1em' />
            </div>
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className='space-y-4'>
        <Label>Nome completo</Label>
        <Input
          placeholder='SEU NOME COMPLETO'
          className='text-center'
          value={nome}
          onChange={(e) => setNome(e.target.value.toUpperCase())}
        />
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} className='w-full hover:cursor-pointer'>
          <span>Confirmar nome</span>
        </Button>
      </CardFooter>
    </Card>
  )
}
