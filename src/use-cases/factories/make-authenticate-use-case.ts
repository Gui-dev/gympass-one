import { UsersRepository } from '@/repositories/prisma/users-repository'

import { AuthenticateUseCase } from '../authenticate'

export const makeAuthenticateUsecase = () => {
  const usersRepository = new UsersRepository()
  const authenticateUseCase = new AuthenticateUseCase(usersRepository)

  return authenticateUseCase
}
