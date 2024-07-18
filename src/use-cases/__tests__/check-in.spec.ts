import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { MaxDistanceError } from '@/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '@/errors/max-number-of-check-ins-error'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { CheckInUseCase } from '../check-in'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase // sut => System under test
describe('Check In Use Case', () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(inMemoryCheckInsRepository, inMemoryGymsRepository)
    vi.useFakeTimers()

    await inMemoryGymsRepository.create({
      id: 'fake_gym_id',
      title: 'Fake Gym',
      description: 'Fake description',
      phone: 'Fake phone',
      latitude: -23.7833232,
      longitude: -46.6801928,
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to check in', async () => {
    const { check_in } = await sut.execute({
      user_id: 'user_fake_id',
      gym_id: 'fake_gym_id',
      user_latitude: -23.7833232,
      user_longitude: -46.6801928,
    })

    expect(check_in.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2024, 6, 16, 9, 0, 0))
    await sut.execute({
      user_id: 'user_fake_id',
      gym_id: 'fake_gym_id',
      user_latitude: -23.7833232,
      user_longitude: -46.6801928,
    })

    await expect(() =>
      sut.execute({
        user_id: 'user_fake_id',
        gym_id: 'fake_gym_id',
        user_latitude: -23.7833232,
        user_longitude: -46.6801928,
      }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckInsError)
  })

  it('should be able to check in twice but in different days', async () => {
    vi.setSystemTime(new Date(2024, 6, 16, 9, 0, 0))
    await sut.execute({
      user_id: 'user_fake_id',
      gym_id: 'fake_gym_id',
      user_latitude: -23.7833232,
      user_longitude: -46.6801928,
    })

    vi.setSystemTime(new Date(2024, 6, 17, 9, 0, 0))

    const { check_in } = await sut.execute({
      user_id: 'user_fake_id',
      gym_id: 'fake_gym_id',
      user_latitude: -23.7833232,
      user_longitude: -46.6801928,
    })

    expect(check_in.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    inMemoryGymsRepository.items.push({
      id: 'fake_gym_id_2',
      title: 'Fake Gym 2',
      description: 'Fake description 2',
      phone: 'Fake phone 2',
      latitude: new Decimal(-23.7851552),
      longitude: new Decimal(-46.686047),
    })

    await expect(() =>
      sut.execute({
        user_id: 'user_fake_id',
        gym_id: 'fake_gym_id_2',
        user_latitude: -23.7833232,
        user_longitude: -46.6801928,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
