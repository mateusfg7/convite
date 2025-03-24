import { Convite } from '@prisma/client'
import React from 'react'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { genCode } from '~/lib/gen-code'

type Guest = {
  Convidado: string
  Contato: string
  'Libera acompanhante': string
  'S ou N': string
  'Vem?': string
}

const ImportCSVButton = ({
  handleImport,
}: {
  handleImport: (
    invitations: Omit<
      Convite,
      'id' | 'atualizado_em' | 'criado_em' | 'confirmou_presenca'
    >[]
  ) => void
}) => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const text = await file.text()
    const rows = text.trim().split('\n')
    const headers = rows[0].split(',')

    const expectedHeaders = [
      'Convidado',
      'Contato',
      'Libera acompanhante',
      'S ou N',
      'Vem?',
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
        Convidado: values[0],
        Contato: values[1],
        'Libera acompanhante': values[2],
        'S ou N': values[3],
        'Vem?': values[4],
      }
    })

    handleImport(
      data
        .filter((inv) => inv.Convidado && inv.Convidado.length > 0)
        .map((inv) => {
          const special =
            inv.Contato === 'Extra Emergência' ||
            inv.Contato === 'Extra Amarildo'

          return {
            convidado: !special ? inv.Convidado : null,
            contato: inv.Contato,
            possui_acompanhante: inv['Libera acompanhante'] === 's',
            codigo: genCode().toUpperCase(),
            especial: special,
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
