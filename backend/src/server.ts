import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import noteRoutes from './routes/note.routes'

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use(noteRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`API corriendo en http://localhost:${PORT}`)
})
