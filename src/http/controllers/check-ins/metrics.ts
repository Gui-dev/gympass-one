import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserMetricsUseCase } from '@/use-cases/factories/make-get-user-metrics-use-case'

export const metrics = async (request: FastifyRequest, reply: FastifyReply) => {
  const user_id = request.user.sub

  const getUserMetricsUseCase = makeGetUserMetricsUseCase()
  const { check_ins_count } = await getUserMetricsUseCase.execute({
    user_id,
  })
  return reply.status(201).send({ check_ins_count })
}
