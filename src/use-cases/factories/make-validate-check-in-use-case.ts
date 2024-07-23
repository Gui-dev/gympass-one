import { CheckInsRepository } from '@/repositories/prisma/check-ins-repository'

import { ValidateCheckInUseCase } from '../validate-check-in'

export const makeValidateCheckInUseCase = () => {
  const checkInsRepository = new CheckInsRepository()
  const validateCheckIn = new ValidateCheckInUseCase(checkInsRepository)

  return validateCheckIn
}
