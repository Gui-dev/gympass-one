import { CheckInsRepository } from '@/repositories/prisma/check-ins-repository'
import { GymsRepository } from '@/repositories/prisma/gyms-repository'

import { CheckInUseCase } from '../check-in'

export const makeCheckInUseCase = () => {
  const checkInsRepository = new CheckInsRepository()
  const gymsRepository = new GymsRepository()
  const checkIn = new CheckInUseCase(checkInsRepository, gymsRepository)

  return checkIn
}
