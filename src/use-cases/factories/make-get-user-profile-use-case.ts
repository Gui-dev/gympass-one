import { UsersRepository } from '@/repositories/prisma/users-repository'

import { GetUserProfileUseCase } from '../get-user-profile'

export const makeGetUserProfileUseCase = () => {
  const usersRepository = new UsersRepository()
  const getUserProfile = new GetUserProfileUseCase(usersRepository)

  return getUserProfile
}
