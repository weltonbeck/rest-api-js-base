import { jwtSign } from '../src/utils/jwt'
import { mockAdministratorId } from './mocks/administrator.mock'

export const getAdminToken = () => {
  return jwtSign({ id: mockAdministratorId })
}
