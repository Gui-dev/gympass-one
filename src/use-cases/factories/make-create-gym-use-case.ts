import { GymsRepository } from '@/repositories/prisma/gyms-repository'

import { CreateGymUseCase } from '../create-gym'

export const makeCreateGymUseCase = () => {
  const gymsRepository = new GymsRepository()
  const createGym = new CreateGymUseCase(gymsRepository)

  return createGym
}
