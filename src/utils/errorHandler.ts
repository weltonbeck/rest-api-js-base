import { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (error.validation) {
    return reply.status(error.statusCode || 400).send({
      statusCode: error.statusCode || 500,
      code: error.code,
      error: 'validation',
      message: error.message,
      errors: error.validation.map((e) => {
        return {
          property: e.params.missingProperty || '',
          message: e.message,
        }
      }),
    })
  }
  reply.send(error)
}
