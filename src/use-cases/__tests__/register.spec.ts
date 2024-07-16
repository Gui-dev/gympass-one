import { compare } from 'bcryptjs'
import { describe, expect, it } from 'vitest'

import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { RegisterUseCase } from '../register'

describe('User register', () => {
  it('should be able to register', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Fake Name',
      email: 'fake_email@email.com',
      password: 'fake_password',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const { user } = await registerUseCase.execute({
      name: 'Fake Name',
      email: 'fake_email@email.com',
      password: 'fake_password',
    })
    const isPasswordCorrectlyHashed = await compare(
      'fake_password',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(inMemoryUsersRepository)

    const email = 'fake_email@email.com'

    await registerUseCase.execute({
      name: 'Fake Name',
      email,
      password: 'fake_password',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'Fake Name',
        email,
        password: 'fake_password',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
