import { FastifyInstance } from 'fastify'
import { list, get, create, update, remove } from '../controllers/user'

const userProps = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    name: { type: 'string' },
  },
}

export const userRoutes = async (app: FastifyInstance) => {
  app.get('/', {
    schema: {
      summary: 'List',
      tags: ['users'],
      response: {
        200: { description: 'List all', type: 'array', items: userProps },
      },
    },
    handler: list,
  })

  app.get('/:id', {
    schema: {
      summary: 'Get',
      tags: ['users'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'id' },
        },
      },
      response: {
        200: { description: 'Get by id', ...userProps },
        404: {
          description: 'Not Found',
          type: 'object',
          properties: { error: { type: 'string' } },
        },
      },
    },
    handler: get,
  })

  app.post('/', {
    schema: {
      summary: 'Create',
      tags: ['users'],
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
        },
      },
      response: {
        201: { description: 'Create', ...userProps },
      },
    },
    handler: create,
  })

  app.put('/:id', {
    schema: {
      summary: 'Update',
      tags: ['users'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'id' },
        },
      },
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string' },
        },
      },
      response: {
        200: { description: 'Update', ...userProps },
        404: {
          description: 'Not Found',
          type: 'object',
          properties: { error: { type: 'string' } },
        },
      },
    },
    handler: update,
  })

  app.delete('/:id', {
    schema: {
      summary: 'Delete',
      tags: ['users'],
      params: {
        type: 'object',
        properties: {
          id: { type: 'number', description: 'id' },
        },
      },
      response: {
        204: { description: 'Delete', type: 'null' },
        404: {
          description: 'Not Found',
          type: 'object',
          properties: { error: { type: 'string' } },
        },
      },
    },
    handler: remove,
  })
}
