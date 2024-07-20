import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'

import { prisma } from '@/lib/prisma'

import { ICheckInsRepository } from '../contracts/check-ins-repository'

export class CheckInsRepository implements ICheckInsRepository {
  public async findById(check_in_id: string): Promise<CheckIn | null> {
    const check_in = await prisma.checkIn.findUnique({
      where: {
        id: check_in_id,
      },
    })

    return check_in
  }

  public async findByUserIdOnDate(
    user_id: string,
    date: Date,
  ): Promise<CheckIn | null> {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')

    const check_in = await prisma.checkIn.findFirst({
      where: {
        user_id,
        created_at: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    })

    return check_in
  }

  public async findManyByUserId(
    user_id: string,
    page: number,
  ): Promise<CheckIn[]> {
    const check_ins = await prisma.checkIn.findMany({
      where: {
        user_id,
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return check_ins
  }

  public async countByUserId(user_id: string): Promise<number> {
    const count = await prisma.checkIn.count({
      where: {
        user_id,
      },
    })

    return count
  }

  public async create({
    user_id,
    gym_id,
  }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn> {
    const check_in = await prisma.checkIn.create({
      data: {
        user_id,
        gym_id,
      },
    })

    return check_in
  }

  public async save(data: CheckIn): Promise<CheckIn> {
    const check_in = await prisma.checkIn.update({
      where: {
        id: data.id,
      },
      data,
    })

    return check_in
  }
}
