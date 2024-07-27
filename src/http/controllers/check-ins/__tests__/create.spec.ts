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
  it('should be able to create a check-in', async () => {
    const { token } = await createAndAuthenticateUser(app)
    const gym = await prisma.gym.create({
      data: {
        title: 'Fake title',
        description: 'Fake description',
        phone: 'Fake phone',
        latitude: -23.7833232,
        longitude: -46.6801928,
      },
    })
    const createGymResponse = await request(app.server)
      .post(`/gyms/${gym.id}/check-ins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: -23.7833232,
        longitude: -46.6801928,
      })

    expect(createGymResponse.statusCode).toEqual(201)
  })
})
