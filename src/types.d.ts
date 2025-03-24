// types.d.ts or at the top of your file
import { PrismaClient } from '@prisma/client'

declare global {
  var prismaClient: PrismaClient | undefined
}
