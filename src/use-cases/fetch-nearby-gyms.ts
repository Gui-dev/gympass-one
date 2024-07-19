import { Gym } from '@prisma/client'

import { IGymsRepository } from '@/repositories/contracts/gyms-repository'

interface IFetchNearbyGymsUseCaseRequest {
  user_latitude: number
  user_longitude: number
}

interface IFetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  public async execute({
    user_latitude,
    user_longitude,
  }: IFetchNearbyGymsUseCaseRequest): Promise<IFetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: user_latitude,
      longitude: user_longitude,
    })

    return {
      gyms,
    }
  }
}
