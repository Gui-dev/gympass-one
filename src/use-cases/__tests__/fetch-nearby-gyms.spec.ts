import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { FetchNearbyGymsUseCase } from '../fetch-nearby-gyms'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase // sut => System under test
describe('Fetch Nearby Use Case', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(inMemoryGymsRepository)
  })
  it('should be able to fetch nearby gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'Fake Near Gym',
      description: 'Fake description',
      phone: 'Fake phone',
      latitude: -23.7833232,
      longitude: -46.6801928,
    })

    await inMemoryGymsRepository.create({
      title: 'Fake Far Gym',
      description: 'Fake description 2',
      phone: 'Fake phone 2',
      latitude: -23.6389641,
      longitude: -46.6938852,
    })

    const { gyms } = await sut.execute({
      user_latitude: -23.7833232,
      user_longitude: -46.6801928,
    })

    expect(gyms).toHaveLength(1)
  })
})
