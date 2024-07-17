import { randomUUID } from 'node:crypto'

import { CheckIn, Prisma } from '@prisma/client'

import { ICheckInsRepository } from '../contracts/check-ins-repository'

export class InMemoryCheckInsRepository implements ICheckInsRepository {
  public items: CheckIn[] = []
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
