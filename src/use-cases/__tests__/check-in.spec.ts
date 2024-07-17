import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { CheckInUseCase } from '../check-in'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase // sut => System under test
describe('Check In Use Case', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(inMemoryCheckInsRepository)
  })
  it('should be able to check in', async () => {
    const { check_in } = await sut.execute({
      user_id: 'user_fake_id',
      gym_id: 'gym_fake_id',
    })

    expect(check_in.id).toEqual(expect.any(String))
  })
})
