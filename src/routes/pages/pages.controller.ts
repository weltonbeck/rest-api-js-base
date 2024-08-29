import { FastifyReply, FastifyRequest } from 'fastify'

export const healthcheck = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  return reply.send({ success: true })
}
