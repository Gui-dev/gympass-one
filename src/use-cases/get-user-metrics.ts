import { ICheckInsRepository } from '@/repositories/contracts/check-ins-repository'

interface IGetUserMetricsUseCaseRequest {
  user_id: string
}

interface IGetUserMetricsUseCaseResponse {
  check_ins_count: number
}

export class GetUserMetricsUseCase {
  constructor(private checkInRepository: ICheckInsRepository) {}

  public async execute({
    user_id,
  }: IGetUserMetricsUseCaseRequest): Promise<IGetUserMetricsUseCaseResponse> {
    const check_ins_count = await this.checkInRepository.countByUserId(user_id)

    return {
      check_ins_count,
    }
  }
}
