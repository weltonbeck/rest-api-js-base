import { prisma } from '../../src/utils/database'

export const mockUsers = async () => {
  await prisma.user.createMany({
    data: [
      {
        id: 'f0d0c147-47ff-4de6-af5c-ae0253db7627',
        email: 'fulano@slideworks.cc',
        name: 'Fulano',
      },
    ],
  })
}

export const clearMockUsers = async () => {
  await prisma.user.deleteMany()
}
