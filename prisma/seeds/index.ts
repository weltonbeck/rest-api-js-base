import { prisma } from '../../src/utils/database/prismaClient'
import createSeedAdministrator from './administrator.seed'

async function seed() {
  console.log(`Start seeding ...`)

  await createSeedAdministrator(prisma)

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
