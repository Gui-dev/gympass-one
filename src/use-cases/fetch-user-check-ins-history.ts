import { CheckIn } from '@prisma/client'

import { ICheckInsRepository } from '@/repositories/contracts/check-ins-repository'

interface IFetchUserCheckInsHistoryUseCaseRequest {
  user_id: string
  page: number
}
interface IFetchUserCheckInsHistoryUseCaseResponse {
  check_ins: CheckIn[]
}

export class FetchUserCheckInsHistoryUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  public async execute({
    user_id,
    page,
  }: IFetchUserCheckInsHistoryUseCaseRequest): Promise<IFetchUserCheckInsHistoryUseCaseResponse> {
    const check_ins = await this.checkInsRepository.findManyByUserId(
      user_id,
      page,
    )

    return {
      check_ins,
    }
  }
}
