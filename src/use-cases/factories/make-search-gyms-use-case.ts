import { GymsRepository } from '@/repositories/prisma/gyms-repository'

import { SearchGymsUseCase } from '../search-gyms'

export const makeSearchGymsUseCase = () => {
  const gymsRepository = new GymsRepository()
  const searchGyms = new SearchGymsUseCase(gymsRepository)

  return searchGyms
}
