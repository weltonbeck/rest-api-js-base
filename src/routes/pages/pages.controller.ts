import { FastifyReply, FastifyRequest } from 'fastify'
import { AppController } from '../app.controller'

export class PagesController extends AppController {
  async healthcheck(request: FastifyRequest, reply: FastifyReply) {
    return reply.send({ success: true })
  }
}
