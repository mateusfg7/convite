'use server'

import { prismaClient } from '~/lib/prisma'

export async function listInvitations() {
  return await prismaClient.convite.findMany()
}
