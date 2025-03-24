'use server'

import { prismaClient } from '~/lib/prisma'

export async function updateName(code: string, name: string) {
  await prismaClient.convite.update({
    where: {
      codigo: code,
    },
    data: {
      convidado: name.trim().toUpperCase(),
    },
  })
}
