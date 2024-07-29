import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'

describe('Refresh Token Controller (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })
  afterAll(async () => {
    await app.close()
  })
  it('should be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      name: 'Bruce Wayne',
      email: 'bruce@email.com',
      password: '123456',
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'bruce@email.com',
      password: '123456',
    })

    const cookies = authResponse.get('Set-Cookie')
    const refreshResponse = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies!)
      .send()

    expect(refreshResponse.statusCode).toEqual(200)
    expect(refreshResponse.body).toEqual({
      token: expect.any(String),
    })
    expect(refreshResponse.get('Set-Cookie')).toEqual([
      expect.stringContaining('refresh_token='),
    ])
  })
})
