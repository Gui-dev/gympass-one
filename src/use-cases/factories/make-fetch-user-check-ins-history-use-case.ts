import { CheckInsRepository } from '@/repositories/prisma/check-ins-repository'

import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

export const makeFetchUserCheckInsHistoryUseCase = () => {
  const checkInsRepository = new CheckInsRepository()
  const fetchUserCheckInsHistory = new FetchUserCheckInsHistoryUseCase(
    checkInsRepository,
  )

  return fetchUserCheckInsHistory
}
