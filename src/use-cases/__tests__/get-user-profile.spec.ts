import { hash } from 'bcryptjs'
import { beforeEach, describe, expect, it } from 'vitest'

import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'

import { GetUserProfileUseCase } from '../get-user-profile'

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase // sut => System under test
describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(inMemoryUsersRepository)
  })
  it('should be able to get user profile', async () => {
    const fakeUser = await inMemoryUsersRepository.create({
      name: 'Fake Name',
      email: 'fake_email@email.com',
      password_hash: await hash('fake_password', 6),
    })

    const { user } = await sut.execute({
      user_id: fakeUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual('Fake Name')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        user_id: 'wrong_id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})