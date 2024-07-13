import { hash } from 'bcryptjs'

import { prisma } from '@/lib/prisma'

interface IRegisterRequest {
  name: string
  email: string
  password: string
}

export const regsisterUseCase = async ({
  name,
  email,
  password,
}: IRegisterRequest) => {
  const password_hash = await hash(password, 6)

  const userAlreadyExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userAlreadyExists) {
    throw new Error('E-mail already exists')
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password_hash,
    },
  })
}
