import { CheckInsRepository } from '@/repositories/prisma/check-ins-repository'

import { GetUserMetricsUseCase } from '../get-user-metrics'

export const makeGetUserMetricsUseCase = () => {
  const checkInsRepository = new CheckInsRepository()
  const getUserMetrics = new GetUserMetricsUseCase(checkInsRepository)

  return getUserMetrics
}
