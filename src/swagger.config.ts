import { FastifyInstance } from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

export const swaggerRoutes = async (app: FastifyInstance) => {
  const swaggerOptions = {
    openapi: {
      openapi: '3.1.0',
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
      components: {
        securitySchemes: {
          authorization: {
            type: 'http',
            scheme: 'bearer',
          },
        },
      },
      security: [{ authorization: [] }],
    },
  }

  const swaggerUiOptions = {
    routePrefix: '/docs',
    exposeRoute: true,
    staticCSP: true,
    uiConfig: {
      deepLinking: false,
    },
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app.register(fastifySwagger, swaggerOptions as any)
  app.register(fastifySwaggerUi, swaggerUiOptions)
}
