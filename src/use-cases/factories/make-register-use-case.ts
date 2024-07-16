import { UsersRepository } from '@/repositories/prisma/users-repository'

import { RegisterUseCase } from '../register'

export const makeRegisterUseCase = () => {
  const usersRepository = new UsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}
