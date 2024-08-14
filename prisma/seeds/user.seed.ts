import { PrismaClient } from '@prisma/client'

export default async function createSeedUser(prisma: PrismaClient) {
  const userExists = await prisma.user.findFirst()

  if (!userExists) {
    await prisma.user.createMany({
      data: [
        {
          id: '38d5b33f-3131-4341-984d-29624830dace',
          name: 'admin',
          email: 'admin@google.com',
        },
      ],
    })

    console.log(`Created seed user`)
  }
}
