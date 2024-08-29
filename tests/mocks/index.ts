import {
  clearMockAdministrators,
  mockAdministrators,
} from './administrator.mock'

export const mockAll = async () => {
  await mockAdministrators()
}

export const clearAllMocks = async () => {
  await clearMockAdministrators()
}
