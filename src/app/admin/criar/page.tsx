'use client'

import { useState } from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Switch } from '~/components/ui/switch'
import { createInvitation } from './_lib/create-invitation'
import { toast } from 'sonner'
import { genCode } from '~/lib/gen-code'
import { Convite } from '@prisma/client'
import ImportCSVButton from './_components/import-invitation'

const Field = ({ children }: { children: React.ReactNode }) => (
  <div className=' space-y-2'>{children}</div>
)

export default function CriarConvitePage() {
  const [nome, setNome] = useState('')
  const [contato, setContato] = useState('')
  const [possuiConvidado, setPossuiConvidado] = useState(false)

  async function handleSubmit() {
    toast.promise(
      () =>
        createInvitation({
          convidado: nome.toUpperCase(),
          contato: contato.toUpperCase(),
          possui_acompanhante: possuiConvidado,
          codigo: genCode().toUpperCase(),
        }),
      {
        loading: 'Criando convite...',
        success: 'Convite criado com sucesso',
        error: 'Erro ao criar convite',
      }
    )
  }

  function handleImport(
    data: Omit<
      Convite,
      'id' | 'atualizado_em' | 'criado_em' | 'confirmou_presenca'
    >[]
  ) {
    toast.promise(() => createInvitation(data), {
      loading: 'Importando convites...',
      success: 'Convites importados com sucesso',
      error: 'Erro ao importar convites',
    })
  }

  return (
    <div>
      <div className='w-[500px] space-y-10 m-auto'>
        <div className='space-y-5'>
          <Field>
            <Label>Nome do convidado</Label>
            <Input value={nome} onChange={(e) => setNome(e.target.value)} />
          </Field>
          <Field>
            <Label>Contato</Label>
            <Input
              value={contato}
              onChange={(e) => setContato(e.target.value)}
            />
          </Field>
          <div className='flex gap-2 items-center justify-between'>
            <Label>Liberar acompanhante</Label>
            <Switch
              checked={possuiConvidado}
              onCheckedChange={setPossuiConvidado}
            />
          </div>
        </div>
        <div className='flex justify-end gap-2'>
          <ImportCSVButton handleImport={handleImport} />
          <Button size='lg' onClick={handleSubmit}>
            Criar
          </Button>
        </div>
      </div>
    </div>
  )
}
