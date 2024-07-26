import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchNearbyUseCase } from '@/use-cases/factories/make-fetch-nearby-use-case'

export const nearby = async (request: FastifyRequest, reply: FastifyReply) => {
  const nearbyGymsQuerySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })
  const { latitude, longitude } = nearbyGymsQuerySchema.parse(request.query)

  const nearbyGymsUseCase = makeFetchNearbyUseCase()
  const { gyms } = await nearbyGymsUseCase.execute({
    user_latitude: latitude,
    user_longitude: longitude,
  })
  return reply.status(201).send({ gyms })
}
