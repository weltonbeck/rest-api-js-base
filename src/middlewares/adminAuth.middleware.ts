import { FastifyRequest } from 'fastify'
import { AdministratorRepository } from '../models/repositories/administrator.repository'
import { Administrator } from '../models/schema/administrator.schema'
import { customError } from '../utils/errors/customError'
import { jwtDecode, jwtVerify } from '../utils/jwt'

type AuthFastifyRequest = FastifyRequest & {
  authMe?: Administrator
}

export const adminAuthMiddleware = async (request: AuthFastifyRequest) => {
  const { authorization } = request.headers

  if (!authorization) {
    throw customError('Token authorization is required', 401)
  }

  if (!jwtVerify(authorization.slice(7))) {
    throw customError('Token authorization is invalid', 401)
  }
  const data = jwtDecode(authorization.slice(7))
  if (data && data.id) {
    const administratorRepository = new AdministratorRepository()
    const administrator = await administratorRepository.findOne({
      id: data.id,
      status: 'active',
    })

    if (!administrator) {
      throw customError('User not found', 401)
    }
    request.authMe = administrator
  } else {
    throw customError('Token authorization is invalid', 401)
  }
}

export const getAuthMe = (
  request: FastifyRequest,
): Administrator | undefined => {
  const administrator = (request as AuthFastifyRequest).authMe
  if (administrator) {
    return administrator
  }
  throw customError('midlewareAuth Not found', 401)
}
