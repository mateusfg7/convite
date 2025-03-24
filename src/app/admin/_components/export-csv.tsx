import { Convite } from '@prisma/client'
import React from 'react'
import { Button } from '~/components/ui/button'

type ExportCSVProps = {
  data: Convite[]
  filename?: string
}

const ExportGuestsCSV = ({
  data,
  filename = 'convidados.csv',
}: ExportCSVProps) => {
  const handleExport = () => {
    if (data.length === 0) {
      alert('Sem dados para exportar.')
      return
    }

    const headers = [
      'ID',
      'Código',
      'Confirmou Presença',
      'Convidado',
      'Contato',
      'Possui Acompanhante',
      'Especial',
      'Criado em',
      'Atualizado em',
    ]

    const csvRows = [
      headers.join(','), // Header row
      ...data.map((guest) =>
        [
          guest.id,
          guest.codigo,
          guest.confirmou_presenca ? 'Sim' : 'Não',
          guest.convidado ?? '',
          guest.contato ?? '',
          guest.possui_acompanhante ? 'Sim' : 'Não',
          guest.especial ? 'Sim' : 'Não',
          guest.criado_em.toISOString(),
          guest.atualizado_em.toISOString(),
        ]
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(',')
      ),
    ]

    const blob = new Blob([csvRows.join('\n')], {
      type: 'text/csv;charset=utf-8;',
    })
    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return <Button onClick={handleExport}>Exportar CSV</Button>
}

export default ExportGuestsCSV
