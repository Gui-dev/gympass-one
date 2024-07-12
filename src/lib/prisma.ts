import { PrismaClient } from '@prisma/client'

import { env } from '@/validations/env'

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'dev' ? ['query'] : [],
})
