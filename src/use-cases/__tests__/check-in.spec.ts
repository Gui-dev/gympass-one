import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { CheckInUseCase } from '../check-in'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase // sut => System under test
describe('Check In Use Case', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(inMemoryCheckInsRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2024, 6, 16, 9, 0, 0))
    const { check_in } = await sut.execute({
      user_id: 'user_fake_id',
      gym_id: 'gym_fake_id',
    })

    console.log(check_in.created_at)

    expect(check_in.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 6, 16, 9, 0, 0))
    await sut.execute({
      user_id: 'user_fake_id',
      gym_id: 'gym_fake_id',
    })

    await expect(() =>
      sut.execute({
        user_id: 'user_fake_id',
        gym_id: 'gym_fake_id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 6, 16, 9, 0, 0))
    await sut.execute({
      user_id: 'user_fake_id',
      gym_id: 'gym_fake_id',
    })

    vi.setSystemTime(new Date(2024, 6, 17, 9, 0, 0))

    const { check_in } = await sut.execute({
      user_id: 'user_fake_id',
      gym_id: 'gym_fake_id',
    })

    expect(check_in.id).toEqual(expect.any(String))
  })
})
