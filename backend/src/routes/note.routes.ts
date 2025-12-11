import { Router } from 'express'
import { NoteController } from '../controllers/note.controller'

const router = Router()
const controller = new NoteController()

router.get('/notes', controller.getActiveNotes)
router.get('/notes/archived', controller.getArchivedNotes)
router.post('/notes', controller.createNote)
router.put('/notes/:id', controller.updateNote)
router.patch('/notes/:id/archive', controller.archiveNote)
router.delete('/notes/:id', controller.deleteNote)

export default router
