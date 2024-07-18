import { CheckIn } from '@prisma/client'

import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { ICheckInsRepository } from '@/repositories/contracts/check-ins-repository'
import { IGymsRepository } from '@/repositories/contracts/gyms-repository'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

interface ICheckInUseCaseRequest {
  user_id: string
  gym_id: string
  user_latitude: number
  user_longitude: number
}

interface ICheckInUseCaseResponse {
  check_in: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: ICheckInsRepository,
    private gymRepository: IGymsRepository,
  ) {}

  public async execute({
    user_id,
    gym_id,
    user_latitude,
    user_longitude,
  }: ICheckInUseCaseRequest): Promise<ICheckInUseCaseResponse> {
    const gym = await this.gymRepository.findById(gym_id)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const checkInOnSameDay = await this.checkInsRepository.findByUserIdOnDate(
      user_id,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error('')
    }

    const distance = getDistanceBetweenCoordinates(
      {
        latitude: user_latitude,
        longitude: user_longitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    )

    const MAX_DISTANCE_IN_KILOMETERS = 0.1

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new Error()
    }

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
