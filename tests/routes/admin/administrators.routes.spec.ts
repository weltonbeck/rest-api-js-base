import request from 'supertest'
import app from '../../../src/app'
import { getAdminToken } from '../../helpers'
import { clearAllMocks, mockAll } from '../../mocks'
import { administratorValidation } from '../../model/entities/administrator.validate'
import { pagingValidation } from '../../shared/common.validate'

describe('admin.administrators.routes', () => {
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

  describe('get one', () => {
    it('should be able to get one', async () => {
      const response = await request(app.server)
        .get('/admin/administrators/f0d0c147-47ff-4de6-af5c-ae0253db7627')
        .set('authorization', token)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('success')
      expect(response.body.success).toEqual(true)
      expect(response.body).toHaveProperty('data')
      administratorValidation(response.body.data)
    })
    it('should not be able to get one', async () => {
      const response = await request(app.server)
        .get('/admin/administrators/00000000-0000-0000-0000-000000000000')
        .set('authorization', token)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('Not found')
    })
  })

  describe.only('list', () => {
    it('should be able to list', async () => {
      const response = await request(app.server)
        .get('/admin/administrators')
        .set('authorization', token)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('success')
      expect(response.body.success).toEqual(true)
      expect(response.body).toHaveProperty('data')
      administratorValidation(response.body.data[0])
      expect(response.body).toHaveProperty('paging')
      pagingValidation(response.body.paging)
    })
  })

  describe('create a new', () => {
    const dataSend = {
      name: 'jhon doe',
      email: 'jhon@email.com',
      password: '123456',
      status: 'active',
    }
    it('should be able to create a new', async () => {
      const response = await request(app.server)
        .post('/admin/administrators')
        .send(dataSend)
        .set('authorization', token)

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('success')
      expect(response.body.success).toEqual(true)
      expect(response.body).toHaveProperty('data')
      administratorValidation(response.body.data)
      expect(response.body.data.name).toEqual(dataSend.name)
    })

    it('should not be able to create a new, required property', async () => {
      const response = await request(app.server)
        .post('/admin/administrators')
        .send({})
        .set('authorization', token)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('validation')
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toContain(
        "body must have required property 'name'",
      )
    })

    it('should not be able to create a new, email already exists', async () => {
      const response = await request(app.server)
        .post('/admin/administrators')
        .send({ ...dataSend, email: 'fulano@email.com' })
        .set('authorization', token)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toContain('Email already exists')
    })
  })

  describe('update', () => {
    it('should be able to update', async () => {
      const dataSend = {
        name: 'jhon doe',
      }
      const response = await request(app.server)
        .put('/admin/administrators/f0d0c147-47ff-4de6-af5c-ae0253db7627')
        .send(dataSend)
        .set('authorization', token)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('success')
      expect(response.body.success).toEqual(true)
      expect(response.body).toHaveProperty('data')
      administratorValidation(response.body.data)
      expect(response.body.data.name).toEqual(dataSend.name)
    })

    it('should not be able to update', async () => {
      const response = await request(app.server)
        .put('/admin/administrators/00000000-0000-0000-0000-000000000000')
        .send({
          name: 'jhon doe',
        })
        .set('authorization', token)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('Not found')
    })
  })

  describe('remove', () => {
    it('should be able to delete', async () => {
      const response = await request(app.server)
        .delete('/admin/administrators/f0d0c147-47ff-4de6-af5c-ae0253db7627')
        .set('authorization', token)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('success')
      expect(response.body.success).toEqual(true)
    })

    it('should be able to delete', async () => {
      const response = await request(app.server)
        .delete('/admin/administrators/00000000-0000-0000-0000-000000000000')
        .set('authorization', token)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('Not found')
    })
  })
})
