import { GymsRepository } from '@/repositories/prisma/gyms-repository'

import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

export const makeFetchNearbyUseCase = () => {
  const gymsRepository = new GymsRepository()
  const fetchNearbyGyms = new FetchNearbyGymsUseCase(gymsRepository)

  return fetchNearbyGyms
}
