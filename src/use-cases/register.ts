import { User } from '@prisma/client'
import { hash } from 'bcryptjs'

import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { IUsersRepository } from '@/repositories/contracts/users-repository'

interface IRegisterRequest {
  name: string
  email: string
  password: string
}

interface IRegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    name,
    email,
    password,
  }: IRegisterRequest): Promise<IRegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userAlreadyExists = await this.usersRepository.findByEmail(email)

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })

    return {
      user,
    }
  }
}
