import { exec } from 'child_process'
import dotenv from 'dotenv'
import NodeEnvironment from 'jest-environment-node'
import { Client } from 'pg'
import util from 'util'

dotenv.config()

const execSync = util.promisify(exec)
export default class PrismaTestEnvironment extends NodeEnvironment {
  private schema = 'test'

  private connectionUrl: string = ''

  async setup() {
    process.env.DATABASE_URL = process.env.DATABASE_URL?.replace(
      'schema=public',
      `schema=${this.schema}`,
    )
    this.global.process.env.DATABASE_URL = process.env.DATABASE_URL

    this.connectionUrl = String(process.env.DATABASE_URL)

    await execSync('npm run prisma:applymigration')

    return super.setup()
  }

  async teardown() {
    const client = new Client({
      connectionString: this.connectionUrl,
    })

    await client.connect()
    await client.query(`DROP SCHEMA IF EXISTS "${this.schema}" CASCADE`)
    await client.end()
  }
}
