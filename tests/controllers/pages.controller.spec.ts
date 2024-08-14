import request from 'supertest'
import app from '../../src/app'

describe('pages.controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(() => {
    app.close()
  })

  it('should get healthcheck', async () => {
    const response = await request(app.server).get('/')
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('success')
    expect(response.body.success).toEqual(true)
  })
})
