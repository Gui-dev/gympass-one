import { CheckIn } from '@prisma/client'

import { ICheckInsRepository } from '@/repositories/contracts/check-ins-repository'

interface ICheckInUseCaseRequest {
  user_id: string
  gym_id: string
}

interface ICheckInUseCaseResponse {
  check_in: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  public async execute({
    user_id,
    gym_id,
  }: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
    const check_in = await this.checkInsRepository.create({
      user_id,
      gym_id,
    })

    if (!check_in) {
      throw new Error('')
    }

    return {
      check_in,
    }
  }
}
