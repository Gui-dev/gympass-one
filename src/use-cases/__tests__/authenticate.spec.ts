import { hash } from 'bcryptjs'
import { describe, expect, it } from 'vitest'

import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { AuthenticateUseCase } from '../authenticate'

describe('Authenticate', () => {
  it('should be able to authenticate', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(inMemoryUsersRepository) // sut => System under test

    await inMemoryUsersRepository.create({
      name: 'Fake Name',
      email: 'fake_email@email.com',
      password_hash: await hash('fake_password', 6),
    })

    const { user } = await sut.execute({
      email: 'fake_email@email.com',
      password: 'fake_password',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    const inMemoryUsersRepository = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(inMemoryUsersRepository) // sut => System under test

    await expect(() =>
      sut.execute({
        email: 'fake_email@email.com',
        password: 'fake_password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
