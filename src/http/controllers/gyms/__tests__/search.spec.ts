import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user'

describe('Create Gyms Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to search a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Fake title',
        description: 'Fake description',
        phone: 'Fake phone',
        latitude: -23.7833232,
        longitude: -46.6801928,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Another title',
        description: 'Fake description 2',
        phone: 'Fake phone 2',
        latitude: -23.7833232,
        longitude: -46.6801928,
      })

    const searchResponse = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'Fake title',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(searchResponse.statusCode).toEqual(201)
    expect(searchResponse.body.gyms).toHaveLength(1)
    expect(searchResponse.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Fake title',
      }),
    ])
  })
})
