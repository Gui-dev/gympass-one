import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchUserCheckInsHistoryUseCase } from '@/use-cases/factories/make-fetch-user-check-ins-history-use-case'

export const history = async (request: FastifyRequest, reply: FastifyReply) => {
  const user_id = request.user.sub
  const historyGymsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })
  const { page } = historyGymsQuerySchema.parse(request.query)

  const fetchUserCheckInsHistoryUseCase = makeFetchUserCheckInsHistoryUseCase()
  const { check_ins } = await fetchUserCheckInsHistoryUseCase.execute({
    user_id,
    page,
  })
  return reply.status(201).send({ check_ins })
}
