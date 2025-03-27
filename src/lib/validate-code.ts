'use server'

import { Convite } from '@prisma/client'
import { prismaClient } from './prisma'

export async function validateCode(
  code: string
): Promise<'invalid' | 'already_confirmed' | 'ok'> {
  const invitation = await prismaClient.convite.findFirst({
    where: {
      codigo: code.trim().toUpperCase(),
    },
  })

  // if (!invitation) return 'Código ou nome inválidos!'
  if (!invitation) return 'invalid'
  // if (invitation.confirmou_presenca) return 'Código já confirmado!'
  if (invitation.confirmou_presenca) return 'already_confirmed'

  return 'ok'
}
