import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import { IUsersRepository } from '../contracts/users-repository'

export class UsersRepository implements IUsersRepository {
  public async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })
    return user
  }

  public async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}
