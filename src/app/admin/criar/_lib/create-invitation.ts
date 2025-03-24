'use server'

import { Convite } from '@prisma/client'
import { prismaClient } from '~/lib/prisma'

type Props = Pick<
  Convite,
  'convidado' | 'contato' | 'possui_acompanhante' | 'codigo'
>

export async function createInvitation(data: Props | Props[]) {
  if (Array.isArray(data)) {
    return await prismaClient.convite.createMany({
      data,
    })
  } else {
    await prismaClient.convite.create({
      data,
    })
  }
}
