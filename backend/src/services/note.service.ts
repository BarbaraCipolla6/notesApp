import { NoteRepository } from '../repositories/note.repository'

export class NoteService {
  private repository: NoteRepository

  constructor() {
    this.repository = new NoteRepository()
  }

  async getActiveNotes() {
    return this.repository.findAll(false)
  }

  async getArchivedNotes() {
    return this.repository.findAll(true)
  }

  async createNote(title: string, content: string) {
    if (!title || !content) {
      throw new Error('Title and content are required')
    }
    return this.repository.create({ title, content })
  }

  async updateNote(id: number, title?: string, content?: string, archived?: boolean) {
    const note = await this.repository.findById(id)
    if (!note) {
      throw new Error('Note not found')
    }
    return this.repository.update(id, { title, content, archived })
  }

  async archiveNote(id: number, archived: boolean) {
    const note = await this.repository.findById(id)
    if (!note) {
      throw new Error('Note not found')
    }
    return this.repository.update(id, { archived })
  }

  async deleteNote(id: number) {
    const note = await this.repository.findById(id)
    if (!note) {
      throw new Error('Note not found')
    }
    return this.repository.delete(id)
  }
}
