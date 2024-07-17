import { CheckIn, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { ICheckInsRepository } from '../contracts/check-ins-repository'

export class CheckInsRepository implements ICheckInsRepository {
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
