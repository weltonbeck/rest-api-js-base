import { prisma } from '../../src/utils/database/prismaClient'

export const mockAdministratorId = 'f0d0c147-47ff-4de6-af5c-ae0253db7627'

export const mockAdministrators = async () => {
  await prisma.administrator.createMany({
    data: [
      {
        id: mockAdministratorId,
        email: 'fulano@email.com',
        name: 'Fulano',
        password:
          '$2b$10$baLDZWA9ASRIw2HRhDwHYemYlbIbYkspnkTkHBa5BROSVq5i9ZVga', // 123456
        status: 'active',
      },
    ],
  })
}

export const clearMockAdministrators = async () => {
  await prisma.administrator.deleteMany()
}