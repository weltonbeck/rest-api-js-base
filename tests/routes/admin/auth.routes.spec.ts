import request from 'supertest'
import app from '../../../src/app'
import { jwtVerify } from '../../../src/utils/jwt'
import { clearAllMocks, mockAll } from '../../mocks'

describe('admin.administrators.routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(() => {
    app.close()
  })

  beforeEach(async () => {
    await mockAll()
  })

  afterEach(async () => {
    await clearAllMocks()
  })

  describe('login', () => {
    const dataSend = {
      email: 'fulano@email.com',
      password: '123456',
    }
    it('should be able to login', async () => {
      const response = await request(app.server)
        .post('/admin/login')
        .send(dataSend)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('success')
      expect(response.body.success).toEqual(true)
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveProperty('token')
      expect(jwtVerify(response.body.data.token)).toBeTruthy()
    })

    it('should not be able to login, invalid email', async () => {
      const response = await request(app.server)
        .post('/admin/login')
        .send({ ...dataSend, email: 'email@email.com' })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toContain(
        'your email or password is incorrect',
      )
    })

    it('should not be able to login, invalid password', async () => {
      const response = await request(app.server)
        .post('/admin/login')
        .send({ ...dataSend, password: '123' })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toContain(
        'your email or password is incorrect',
      )
    })
  })
})
