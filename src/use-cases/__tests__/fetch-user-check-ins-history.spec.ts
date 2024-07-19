import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { FetchUserCheckInsHistoryUseCase } from '../fetch-user-check-ins-history'

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase // sut => System under test

describe('Fetch User Check Ins History', () => {
  beforeEach(() => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(inMemoryCheckInsRepository)
  })
  it('should be able to fetch check ins history', async () => {
    await inMemoryCheckInsRepository.create({
      user_id: 'fake_user_id',
      gym_id: 'fake_gym_id',
    })

    await inMemoryCheckInsRepository.create({
      user_id: 'fake_user_id',
      gym_id: 'fake_gym_id_2',
    })

    const { check_ins } = await sut.execute({
      user_id: 'fake_user_id',
      page: 1,
    })

    expect(check_ins).toHaveLength(2)
    expect(check_ins).toEqual([
      expect.objectContaining({ gym_id: 'fake_gym_id' }),
      expect.objectContaining({ gym_id: 'fake_gym_id_2' }),
    ])
  })

  it('should be able to fetch paginated check in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCheckInsRepository.create({
        user_id: 'fake_user_id',
        gym_id: `fake_gym_id_${i}`,
      })
    }

    const { check_ins } = await sut.execute({
      user_id: 'fake_user_id',
      page: 2,
    })

    expect(check_ins).toHaveLength(2)
    expect(check_ins).toEqual([
      expect.objectContaining({ gym_id: 'fake_gym_id_21' }),
      expect.objectContaining({ gym_id: 'fake_gym_id_22' }),
    ])
  })
})
