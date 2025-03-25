'use server'

import { Prisma } from '@prisma/client'
import { prismaClient } from '~/lib/prisma'

export type CreateInvitationProps = Prisma.ConviteCreateInput

export async function createInvitation(
  data: CreateInvitationProps | CreateInvitationProps[]
) {
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
