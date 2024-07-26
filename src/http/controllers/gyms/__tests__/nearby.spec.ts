import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Nearby Gyms Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Fake Near Gym',
        description: 'Fake description',
        phone: 'Fake phone',
        latitude: -23.7833232,
        longitude: -46.6801928,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Fake Far Gym',
        description: 'Fake description 2',
        phone: 'Fake phone 2',
        latitude: -23.6389641,
        longitude: -46.6938852,
      })

    const nearbyResponse = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -23.7833232,
        longitude: -46.6801928,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(nearbyResponse.statusCode).toEqual(200)
    expect(nearbyResponse.body.gyms).toHaveLength(1)
    expect(nearbyResponse.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Fake Near Gym',
      }),
    ])
  })
})
