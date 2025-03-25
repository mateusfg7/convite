'use server'

import { Convite } from '@prisma/client'
import { prismaClient } from './prisma'

export async function validateCode(code: string): Promise<Convite> {
  const invitation = await prismaClient.convite.findFirst({
    where: {
      codigo: code.trim().toUpperCase(),
    },
  })

  if (!invitation) throw new Error('Código ou nome inválidos!')
  if (invitation.confirmou_presenca) throw new Error('Código já confirmado!')

  return invitation
}
