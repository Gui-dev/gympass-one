import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { GetUserMetricsUseCase } from '../get-user-metrics'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase // sut => System under test

describe('Get User Metrics Use Case', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(inMemoryCheckInsRepository)
  })
  it('should be able to get check ins count from metrics', async () => {
    await inMemoryCheckInsRepository.create({
      user_id: 'fake_user_id',
      gym_id: 'fake_gym_id',
    })

    await inMemoryCheckInsRepository.create({
      user_id: 'fake_user_id',
      gym_id: 'fake_gym_id_2',
    })

    const { check_ins_count } = await sut.execute({ user_id: 'fake_user_id' })

    expect(check_ins_count).toEqual(2)
  })
})
