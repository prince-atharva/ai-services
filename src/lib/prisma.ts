import { PrismaClient } from '../../generated/prisma'
import { env } from './env'

declare global {
  var prisma: PrismaClient | undefined // eslint-disable-line no-var
}

const prisma = global.prisma || new PrismaClient()

if (env.NODE_ENV !== 'production') {
  global.prisma = prisma
}

export { prisma }