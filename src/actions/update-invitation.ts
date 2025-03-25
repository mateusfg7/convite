'use server'

import { Convite } from '@prisma/client'
import { prismaClient } from '~/lib/prisma'

type UpdateInvitationData = Omit<
  Partial<Convite>,
  'id' | 'codigo' | 'criado_em' | 'atualizado_em'
>

export async function updateInvitation(
  code: string,
  data: UpdateInvitationData
) {
  await prismaClient.convite.update({
    where: {
      codigo: code,
    },
    data,
  })
}
