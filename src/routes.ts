import { FastifyInstance } from 'fastify'
import { userRoutes } from './modules/users/routes/user'
import { swaggerRoutes } from './swagger'

export const routes = async (app: FastifyInstance) => {
  if (process.env.SHOW_DOC && process.env.SHOW_DOC === 'true') {
    swaggerRoutes(app)
  }

  // app.get('/healthcheck', {
  //   schema: {
  //     tags: ['Default'],
  //     response: {
  //       200: {
  //         type: 'object',
  //         properties: {
  //           status: { type: 'string' },
  //         },
  //       },
  //     },
  //   },
  //   handler: function (req, res) {
  //     res.send({ status: 'ok' })
  //   },
  // })

  app.register(userRoutes, { prefix: 'users' })
}
