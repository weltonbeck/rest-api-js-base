import { jwtSign } from '../src/utils/jwt'
import { mockAdministratorId } from './mocks/administrator.mock'

export const getAdminToken = () => {
  const token = jwtSign({ id: mockAdministratorId })
  return `Bearer ${token}`
}
