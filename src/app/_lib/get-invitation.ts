'use server'

import { prismaClient } from '~/lib/prisma'

export async function getInvitation(code: string) {
  return await prismaClient.convite.findUnique({
    where: {
      codigo: code,
    },
  })
}
