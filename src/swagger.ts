import { FastifyInstance } from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

export const swaggerRoutes = async (app: FastifyInstance) => {
  const swaggerOptions = {
    openapi: {
      info: {
        title: 'RESTful API',
        description: '',
        version: '1.0.0',
      },
      host: `localhost:${process.env.PORT || 3000}`,
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
      tags: [],
    },
  }

  const swaggerUiOptions = {
    routePrefix: '/docs',
    exposeRoute: true,
  }

  app.register(fastifySwagger, swaggerOptions)
  app.register(fastifySwaggerUi, swaggerUiOptions)
}
