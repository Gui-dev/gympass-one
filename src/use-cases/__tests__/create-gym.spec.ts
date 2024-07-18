import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'

import { CreateGymUseCase } from '../create-gym'

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase // sut => System under test
describe('Create Gym Use Case', () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(inMemoryGymsRepository)
  })
  it('should be able to create a gym', async () => {
    const { gym } = await sut.execute({
      title: 'Fake Gym',
      description: 'Fake description',
      phone: 'Fake phone',
      latitude: -23.7833232,
      longitude: -46.6801928,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
