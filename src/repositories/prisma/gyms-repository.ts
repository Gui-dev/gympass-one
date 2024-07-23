import { Gym, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import {
  IFindManyNearbyParams,
  IGymsRepository,
} from '../contracts/gyms-repository'

export class GymsRepository implements IGymsRepository {
  public async findById(id: string): Promise<Gym | null> {
    const gym = await prisma.gym.findFirst({
      where: {
        id,
      },
    })

    return gym
  }

  public async findManyNearby({
    latitude,
    longitude,
  }: IFindManyNearbyParams): Promise<Gym[]> {
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * 
      cos( radians( latitude ) ) * 
      cos( radians( longitude ) - radians(${longitude}) ) + 
      sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }

  public async searchMany(query: string, page: number): Promise<Gym[]> {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  public async create(data: Prisma.GymCreateInput): Promise<Gym> {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }
}
