import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { UsersRepository } from '@/repositories/prisma/users-repository'
import { RegisterUseCase } from '@/use-cases/register'

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })
  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const usersRepository = new UsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)
    await registerUseCase.execute({ name, email, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send()
    }
    throw error
  }

  return reply.status(201).send()
}
