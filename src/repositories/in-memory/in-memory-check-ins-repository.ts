import { randomUUID } from 'node:crypto'

import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'

import { ICheckInsRepository } from '../contracts/check-ins-repository'

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  public items: CheckIn[] = []

  public async findByUserIdOnDate(
    user_id: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const checkOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate =
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)
      return checkIn.user_id === user_id && isOnSameDate
    })

    if (!checkOnSameDate) {
      return null
    }

    return checkOnSameDate
  }

  public async create(
    data: Prisma.CheckInUncheckedCreateInput,
  ): Promise<CheckIn> {
    const check_in: CheckIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(check_in)

    return check_in
  }
}
