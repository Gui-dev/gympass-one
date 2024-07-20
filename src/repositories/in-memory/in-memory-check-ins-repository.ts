import { randomUUID } from 'node:crypto'

import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'

import { ICheckInsRepository } from '../contracts/check-ins-repository'

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  public items: CheckIn[] = []

  public async findById(check_in_id: string): Promise<CheckIn | null> {
    const check_in = this.items.find((checkIn) => checkIn.id === check_in_id)

    if (!check_in) {
      return null
    }

    return check_in
  }

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

  public async findManyByUserId(
    user_id: string,
    page: number,
  ): Promise<CheckIn[]> {
    const check_ins = this.items
      .filter((checkIn) => checkIn.user_id === user_id)
      .slice((page - 1) * 20, page * 20)

    return check_ins
  }

  public async countByUserId(user_id: string): Promise<number> {
    const check_ins = this.items.filter(
      (checkIn) => checkIn.user_id === user_id,
    )

    return check_ins.length
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

  public async save(check_in: CheckIn): Promise<CheckIn> {
    const checkInIndex = this.items.findIndex((item) => item.id === check_in.id)

    if (checkInIndex >= 0) {
      this.items[checkInIndex] = check_in
    }

    return check_in
  }
}
