import { prisma } from '../../src/database/prismaClient'
import createSeedUser from './user.seed'

async function seed() {
  console.log(`Start seeding ...`)

  await createSeedUser(prisma)

  console.log(`Seeding finished.`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
