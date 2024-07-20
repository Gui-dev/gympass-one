import { CheckIn } from '@prisma/client'

import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { ICheckInsRepository } from '@/repositories/contracts/check-ins-repository'

interface IValidateCheckInUseCaseRequest {
  check_in_id: string
}

interface IValidateCheckInUseCaseResponse {
  check_in: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: ICheckInsRepository) {}

  public async execute({
    check_in_id,
  }: IValidateCheckInUseCaseRequest): Promise<IValidateCheckInUseCaseResponse> {
    const checkInExists = await this.checkInsRepository.findById(check_in_id)

    if (!checkInExists) {
      throw new ResourceNotFoundError()
    }

    checkInExists.validated_at = new Date()

    const check_in = await this.checkInsRepository.save(checkInExists)

    return {
      check_in,
    }
  }
}
