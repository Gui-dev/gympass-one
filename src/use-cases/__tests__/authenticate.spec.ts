import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { InvalidCredentialsError } from '@/errors/invalid-credentials-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { AuthenticateUseCase } from '../authenticate'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase // sut => System under test
describe('Authenticate', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(inMemoryUsersRepository)
  })
  it('should be able to authenticate', async () => {
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
    await expect(() =>
      sut.execute({
        email: 'fake_email@email.com',
        password: 'fake_password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await inMemoryUsersRepository.create({
      name: 'Fake Name',
      email: 'fake_email@email.com',
      password_hash: await hash('fake_password', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'fake_email@email.com',
        password: 'fake_password_error',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
