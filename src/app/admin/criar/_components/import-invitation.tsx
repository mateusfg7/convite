import { Convite } from '@prisma/client'
import React from 'react'
import { CreateInvitationProps } from '~/actions/create-invitation'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

type Guest = {
  codigo: string
  confirmou_presenca: string
  convidado: string
  contato: string
  possui_acompanhante: 'Sim' | 'Não'
  especial: 'Sim' | 'Não'
}

const ImportCSVButton = ({
  handleImport,
}: {
  handleImport: (invitations: CreateInvitationProps[]) => void
}) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const text = await file.text()
    const rows = text.trim().split('\n')
    const headers = rows[0].split(',')

    const expectedHeaders = [
      'codigo',
      'confirmou_presenca',
      'convidado',
      'contato',
      'possui_acompanhante',
      'especial',
    ]

    // Validate headers
    const isValid = expectedHeaders.every((h, i) => headers[i]?.trim() === h)
    if (!isValid) {
      alert('CSV headers are incorrect.')
      return
    }

    const data: Guest[] = rows.slice(1).map((row) => {
      const values = row.split(',')
      return {
        codigo: values[0].trim(),
        confirmou_presenca: values[1].trim(),
        convidado: values[2].trim(),
        contato: values[3].trim(),
        possui_acompanhante: values[4].trim() as 'Sim' | 'Não',
        especial: values[5].trim() as 'Sim' | 'Não',
      }
    })

    handleImport(
      data.map((inv) => {
        const special =
          inv.convidado === 'Extra Emergência' ||
          inv.convidado === 'Extra Amarildo'

        return {
          convidado: inv.convidado,
          contato: inv.contato,
          possui_acompanhante: inv.possui_acompanhante === 'Sim',
          codigo: inv.codigo,
          convite_especial: special,
        }
      })
    )

    // You can now send this data to your backend or store it
  }

  return (
    <div>
      <Button size='lg' variant='outline' asChild>
        <Label htmlFor='csvInput'>Importar CSV</Label>
      </Button>
      <Input
        id='csvInput'
        type='file'
        accept='.csv'
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
    </div>
  )
}

export default ImportCSVButton
