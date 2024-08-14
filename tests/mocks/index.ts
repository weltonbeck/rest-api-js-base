import { clearMockUsers, mockUsers } from './users.mock'

export const mockAll = async () => {
  await mockUsers()
}

export const clearAllMocks = async () => {
  await clearMockUsers()
}
