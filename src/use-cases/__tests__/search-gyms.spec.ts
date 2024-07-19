import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { SearchGymsUseCase } from '../search-gyms'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase // sut => System under test
describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(inMemoryGymsRepository)
  })
  it('should be able to search for gyms', async () => {
    await inMemoryGymsRepository.create({
      title: 'Fake Gym',
      description: 'Fake description',
      phone: 'Fake phone',
      latitude: -23.7833232,
      longitude: -46.6801928,
    })

    await inMemoryGymsRepository.create({
      title: 'Fake Gym 2',
      description: 'Fake description 2',
      phone: 'Fake phone 2',
      latitude: -23.7833232,
      longitude: -46.6801928,
    })

    const { gyms } = await sut.execute({ query: '2', page: 1 })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Fake Gym 2' })])
  })
})
