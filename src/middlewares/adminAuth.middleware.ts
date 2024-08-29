import { FastifyRequest } from 'fastify'
import { customError } from '../utils/errors/customError'
import { jwtVerify } from '../utils/jwt'

export const adminAuthMiddleware = async function (req: FastifyRequest) {
  const { authorization } = req.headers

  if (!authorization) {
    throw customError('Token authorization is required', 401)
  }

  if (!jwtVerify(authorization)) {
    throw customError('Token authorization is invalid', 401)
  }
}
