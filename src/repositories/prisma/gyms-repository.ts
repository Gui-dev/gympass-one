import { Gym, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { IGymsRepository } from '../contracts/gyms-repository'

export class GymsRepository implements IGymsRepository {
  public async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findFirst({
      where: {
        id,
      },
    })

    return gym
  }

  public async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }
}
