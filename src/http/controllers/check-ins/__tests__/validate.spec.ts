import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Check-in Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to validate a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app, true)
    const user = await prisma.user.findFirstOrThrow()
    const gym = await prisma.gym.create({
      data: {
        title: 'Fake title',
        description: 'Fake description',
        phone: 'Fake phone',
        latitude: -23.7833232,
        longitude: -46.6801928,
      },
    })
    let check_in = await prisma.checkIn.create({
      data: {
        user_id: user.id,
        gym_id: gym.id,
      },
    })
    const validateCheckInResponse = await request(app.server)
      .patch(`/check-ins/${check_in.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(validateCheckInResponse.statusCode).toEqual(204)

    check_in = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: check_in.id,
      },
    })

    expect(check_in.validated_at).toEqual(expect.any(Date))
  })
})
