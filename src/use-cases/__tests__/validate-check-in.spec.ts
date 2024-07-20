import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { LateCheckInValidationError } from '@/errors/late-check-in-validation-error'
import { ResourceNotFoundError } from '@/errors/resource-not-found-error'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'

import { ValidateCheckInUseCase } from '../validate-check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase
describe('Validate CheckIn Use Case', () => {
  beforeEach(() => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })
  it('should be able to validate the check-in', async () => {
    const create_check_in = await checkInsRepository.create({
      user_id: 'fake_user_id',
      gym_id: 'fake_gym_id',
    })

    const { check_in } = await sut.execute({
      check_in_id: create_check_in.id,
    })

    expect(check_in.validated_at).toEqual(expect.any(Date))
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))
  })

  it('should not be able to validate an inexistent check-in', async () => {
    await expect(() =>
      sut.execute({
        check_in_id: 'fake_check_in_id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check in after 20 minutes of its creation', async () => {
    vi.setSystemTime(new Date(2024, 6, 19, 13, 40))

    const create_check_in = await checkInsRepository.create({
      user_id: 'fake_user_id',
      gym_id: 'fake_gym_id',
    })

    const TWENTY_ONE_MINUTES_IN_MS = 1000 * 60 * 21
    vi.advanceTimersByTime(TWENTY_ONE_MINUTES_IN_MS)

    await expect(() =>
      sut.execute({
        check_in_id: create_check_in.id,
      }),
    ).rejects.toBeInstanceOf(LateCheckInValidationError)
  })
})
