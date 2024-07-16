import { User } from '@prisma/client'

import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { IUsersRepository } from '@/repositories/contracts/users-repository'

interface IGetUserProfileUseCaseRequest {
  user_id: string
}

interface IGetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    user_id,
  }: IGetUserProfileUseCaseRequest): Promise<IGetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(user_id)

    if (!user) {
      throw new ResourceNotFoundError()
    }

    return {
      user,
    }
  }
}
