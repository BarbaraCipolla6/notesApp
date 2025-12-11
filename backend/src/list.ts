import 'dotenv/config'
import { prisma } from './lib/prisma'

async function list() {
  const notes = await prisma.note.findMany({
    orderBy: { createdAt: 'desc' }
  })
  console.log('=== TODAS LAS NOTAS ===')
  console.log(JSON.stringify(notes, null, 2))
  console.log(`\nTotal: ${notes.length} notas`)
}

list()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
