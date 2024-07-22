import request from 'supertest'
import app from '../../app'

export const validateUser = (data: unknown) => {
  expect(data).toHaveProperty('id')
  expect(data).toHaveProperty('name')
  expect(data).toHaveProperty('email')
}

describe('admin.users.controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(() => app.close())

  describe('get one', () => {
    it('should be able to get one', async () => {
      const response = await request(app.server).get('/admin/users/1')
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('success')
      expect(response.body.success).toEqual(true)
      expect(response.body).toHaveProperty('data')
      validateUser(response.body.data)
    })
  })

  describe('list', () => {
    it('should be able to list', async () => {
      const response = await request(app.server).get('/admin/users')
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('success')
      expect(response.body.success).toEqual(true)
      expect(response.body).toHaveProperty('data')
      expect(response.body.data).toHaveLength(1)
      validateUser(response.body.data[0])
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
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('success')
      expect(response.body.success).toEqual(true)
      expect(response.body).toHaveProperty('data')
      validateUser(response.body.data)
      expect(response.body.data.name).toEqual(dataSend.name)
    })

    it('should not be able to create a new', async () => {
      const response = await request(app.server).post('/admin/users').send({})
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
        .put('/admin/users/1')
        .send(dataSend)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('success')
      expect(response.body.success).toEqual(true)
      expect(response.body).toHaveProperty('data')
      validateUser(response.body.data)
      expect(response.body.data.name).toEqual(dataSend.name)
    })
  })

  describe('remove', () => {
    it('should be able to delete', async () => {
      const response = await request(app.server).delete('/admin/users/1')
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('success')
      expect(response.body.success).toEqual(true)
    })
  })
})
