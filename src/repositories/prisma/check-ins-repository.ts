import { CheckIn, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { ICheckInsRepository } from '../contracts/check-ins-repository'

export class CheckInsRepository implements ICheckInsRepository {
  public async findByUserIdOnDate(
    user_id: string,
    date: Date,
  ): Promise<CheckIn | null> {}

  public async findManyByUserId(user_id: string): Promise<CheckIn[]> {
    const check_ins = await prisma.checkIn.findMany({
      where: {
        user_id,
      },
    })

    return check_ins
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
}
