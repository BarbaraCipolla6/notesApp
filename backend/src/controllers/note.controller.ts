import { Request, Response } from 'express'
import { NoteService } from '../services/note.service'

export class NoteController {
  private service: NoteService

  constructor() {
    this.service = new NoteService()
  }

  getActiveNotes = async (req: Request, res: Response) => {
    try {
      const notes = await this.service.getActiveNotes()
      res.json(notes)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching notes' })
    }
  }

  getArchivedNotes = async (req: Request, res: Response) => {
    try {
      const notes = await this.service.getArchivedNotes()
      res.json(notes)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching archived notes' })
    }
  }

  createNote = async (req: Request, res: Response) => {
    try {
      const { title, content } = req.body
      const note = await this.service.createNote(title, content)
      res.status(201).json(note)
    } catch (error: any) {
      res.status(400).json({ error: error.message })
    }
  }

  updateNote = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id)
      const { title, content, archived } = req.body
      const note = await this.service.updateNote(id, title, content, archived)
      res.json(note)
    } catch (error: any) {
      res.status(404).json({ error: error.message })
    }
  }

  archiveNote = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id)
      const { archived } = req.body
      const note = await this.service.archiveNote(id, archived)
      res.json(note)
    } catch (error: any) {
      res.status(404).json({ error: error.message })
    }
  }

  deleteNote = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id)
      await this.service.deleteNote(id)
      res.json({ success: true })
    } catch (error: any) {
      res.status(404).json({ error: error.message })
    }
  }
}
