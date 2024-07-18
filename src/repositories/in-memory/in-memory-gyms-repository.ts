import { Gym } from '@prisma/client'

import { IGymsRepository } from '../contracts/gyms-repository'

export class InMemoryGymsRepository implements IGymsRepository {
  public items: Gym[] = []
  public async findById(id: string): Promise<Gym | null> {
    const gym = this.items.find((gym) => gym.id === id)

    if (!gym) {
      return null
    }

    return gym
  }
}
