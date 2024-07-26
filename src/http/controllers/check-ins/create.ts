import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export const create = async (request: FastifyRequest, reply: FastifyReply) => {
  const user_id = request.user.sub
  const createCheckInParamsSchema = z.object({
    gym_id: z.string(),
  })
  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })
  const { gym_id } = createCheckInParamsSchema.parse(request.params)
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  const createCheckInUseCase = makeCheckInUseCase()
  const { check_in } = await createCheckInUseCase.execute({
    user_id,
    gym_id,
    user_latitude: latitude,
    user_longitude: longitude,
  })
  return reply.status(201).send({ check_in })
}
