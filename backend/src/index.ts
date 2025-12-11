import { prisma } from './lib/prisma'

async function main() {
  // Crear una nota
  const note = await prisma.note.create({
    data: {
      title: "Mi primera nota",
      content: "¡Prisma funciona!"
    }
  })
  console.log('Nota creada:', note)

  // Listar todas las notas
  const notes = await prisma.note.findMany()
  console.log('Todas las notas:', notes)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
