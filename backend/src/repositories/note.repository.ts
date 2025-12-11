import { prisma } from '../lib/prisma'

export class NoteRepository {
  async findAll(archived: boolean) {
    return prisma.note.findMany({
      where: { archived },
      orderBy: { createdAt: 'desc' }
    })
  }

  async findById(id: number) {
    return prisma.note.findUnique({
      where: { id }
    })
  }

  async create(data: { title: string; content: string }) {
    return prisma.note.create({
      data: { ...data, archived: false }
    })
  }

  async update(id: number, data: { title?: string; content?: string; archived?: boolean }) {
    return prisma.note.update({
      where: { id },
      data
    })
  }

  async delete(id: number) {
    return prisma.note.delete({
      where: { id }
    })
  }
}
