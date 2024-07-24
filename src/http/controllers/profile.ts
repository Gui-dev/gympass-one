import { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use-case'

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
  const getUserProfile = makeGetUserProfileUseCase()
  const { user } = await getUserProfile.execute({
    user_id: request.user.sub,
  })
  return reply.status(200).send({
    ...user,
    password_hash: undefined,
  })
}
