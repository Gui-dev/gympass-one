import { Gym } from '@prisma/client'

import { IGymsRepository } from '@/repositories/contracts/gyms-repository'

interface ICreateGymUseCaseRequest {
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface ICreateGymUseCaseResponse {
  gym: Gym
}

export class CreateGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  public async execute(
    data: ICreateGymUseCaseRequest,
  ): Promise<ICreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create(data)

    return {
      gym,
    }
  }
}
