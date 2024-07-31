import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { prisma } from '@/lib/prisma'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Metrics Check-in Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to get total count of check-ins', async () => {
    const { token } = await createAndAuthenticateUser(app)
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

    await prisma.checkIn.createMany({
      data: [
        {
          user_id: user.id,
          gym_id: gym.id,
        },
        {
          user_id: user.id,
          gym_id: gym.id,
        },
      ],
    })

    const metricsResponse = await request(app.server)
      .get('/check-ins/metrics')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(metricsResponse.statusCode).toEqual(200)
    expect(metricsResponse.body.check_ins_count).toEqual(2)
  })
})
