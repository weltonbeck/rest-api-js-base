import { FastifyRequest } from 'fastify'
import { customError } from '../utils/errors/customError'

export const adminAuthMiddleware = async function (req: FastifyRequest) {
  const authorization = req.headers.authorization

  if (!authorization) {
    throw customError('Token authorization is required', 401)
  }
}
