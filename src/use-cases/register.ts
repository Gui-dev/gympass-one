import { hash } from 'bcryptjs'

import { prisma } from '@/lib/prisma'
import { IUsersRepository } from '@/repositories/contracts/users-repository'

interface IRegisterRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ name, email, password }: IRegisterRequest) {
    const password_hash = await hash(password, 6)

    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userAlreadyExists) {
      throw new Error('E-mail already exists')
    }

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
