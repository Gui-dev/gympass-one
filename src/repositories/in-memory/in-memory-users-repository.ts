import { randomUUID } from 'node:crypto'

import { Prisma, User } from '@prisma/client'

import { IUsersRepository } from '../contracts/users-repository'

export class InMemoryUsersRepository implements IUsersRepository {
  public items: User[] = []

  public async findById(id: string): Promise<User | null> {
    const user = this.items.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  public async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }
    this.items.push(user)

    return user
  }
}
