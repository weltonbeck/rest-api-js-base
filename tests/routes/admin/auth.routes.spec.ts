import request from 'supertest'
import app from '../../../src/app'
import { jwtVerify } from '../../../src/utils/jwt'
import { getAdminToken } from '../../helpers'
import { clearAllMocks, mockAll } from '../../mocks'
import { administratorValidation } from '../../model/entities/administrator.validate'

describe('admin.auth.routes', () => {
  let token: string

  beforeAll(async () => {
    await app.ready()
    token = getAdminToken()
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

  describe('get me', () => {
    it('should be able to get me', async () => {
      const response = await request(app.server)
        .get('/admin/me')
        .set('authorization', token)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('success')
      expect(response.body.success).toEqual(true)
      expect(response.body).toHaveProperty('data')
      administratorValidation(response.body.data)
    })
  })
})
