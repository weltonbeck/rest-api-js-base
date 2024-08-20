import request from 'supertest'
import app from '../../../src/app'
import { clearAllMocks, mockAll } from '../../mocks'
import { userValidation } from '../../model/entities/user.validate'

describe('admin.users.controller', () => {
  const token = '123'

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

  describe('get one', () => {
    it('should be able to get one', async () => {
      const response = await request(app.server)
        .get('/admin/users/f0d0c147-47ff-4de6-af5c-ae0253db7627')
        .set('authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('success')
      expect(response.body.success).toEqual(true)
      expect(response.body).toHaveProperty('data')
      userValidation(response.body.data)
    })
    it('should not be able to get one', async () => {
      const response = await request(app.server)
        .get('/admin/users/00000000-0000-0000-0000-000000000000')
        .set('authorization', `Bearer ${token}`)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('Not found')
    })
  })

  describe('list', () => {
    it('should be able to list', async () => {
      const response = await await request(app.server)
        .get('/admin/users')
        .set('authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('success')
      expect(response.body.success).toEqual(true)
      expect(response.body).toHaveProperty('data')
      userValidation(response.body.data[0])
    })
  })

  describe('create a new', () => {
    it('should be able to create a new', async () => {
      const dataSend = {
        name: 'jhon doe',
        email: 'jhon@email.com',
      }
      const response = await request(app.server)
        .post('/admin/users')
        .send(dataSend)
        .set('authorization', `Bearer ${token}`)

      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('success')
      expect(response.body.success).toEqual(true)
      expect(response.body).toHaveProperty('data')
      userValidation(response.body.data)
      expect(response.body.data.name).toEqual(dataSend.name)
    })

    it('should not be able to create a new', async () => {
      const response = await request(app.server)
        .post('/admin/users')
        .send({})
        .set('authorization', `Bearer ${token}`)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body.error).toEqual('validation')
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toContain(
        "body must have required property 'name'",
      )
    })
  })

  describe('update', () => {
    it('should be able to update', async () => {
      const dataSend = {
        name: 'jhon doe',
      }
      const response = await request(app.server)
        .put('/admin/users/f0d0c147-47ff-4de6-af5c-ae0253db7627')
        .send(dataSend)
        .set('authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('success')
      expect(response.body.success).toEqual(true)
      expect(response.body).toHaveProperty('data')
      userValidation(response.body.data)
      expect(response.body.data.name).toEqual(dataSend.name)
    })

    it('should not be able to update', async () => {
      const response = await request(app.server)
        .put('/admin/users/00000000-0000-0000-0000-000000000000')
        .send({
          name: 'jhon doe',
        })
        .set('authorization', `Bearer ${token}`)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('Not found')
    })
  })

  describe('remove', () => {
    it('should be able to delete', async () => {
      const response = await request(app.server)
        .delete('/admin/users/f0d0c147-47ff-4de6-af5c-ae0253db7627')
        .set('authorization', `Bearer ${token}`)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('success')
      expect(response.body.success).toEqual(true)
    })

    it('should be able to delete', async () => {
      const response = await request(app.server)
        .delete('/admin/users/00000000-0000-0000-0000-000000000000')
        .set('authorization', `Bearer ${token}`)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('error')
      expect(response.body).toHaveProperty('message')
      expect(response.body.message).toEqual('Not found')
    })
  })
})
