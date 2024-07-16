import { compare } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { UserAlreadyExistsError } from '@/errors/user-already-exists-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { RegisterUseCase } from '../register'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: RegisterUseCase // sut => System under test
describe('User register', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(inMemoryUsersRepository)
  })
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Fake Name',
      email: 'fake_email@email.com',
      password: 'fake_password',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
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
    const email = 'fake_email@email.com'

    await sut.execute({
      name: 'Fake Name',
      email,
      password: 'fake_password',
    })

    await expect(() =>
      sut.execute({
        name: 'Fake Name',
        email,
        password: 'fake_password',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
