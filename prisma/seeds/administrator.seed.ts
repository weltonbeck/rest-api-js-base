import { PrismaClient } from '@prisma/client'
import { generateHash } from '../../src/utils/hash'

export default async function createSeedAdministrator(prisma: PrismaClient) {
  const adminExists = await prisma.administrator.findFirst()

  if (!adminExists) {
    const password = await generateHash('123456')

    await prisma.administrator.createMany({
      data: [
        {
          id: '38d5b33f-3131-4341-984d-29624830dace',
          name: 'admin',
          email: 'admin@admin.com',
          password,
          status: 'active',
        },
      ],
    })

    console.log(`Created seed administrator`)
  }
}
