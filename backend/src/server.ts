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

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Servidor escuchando en el puerto :${PORT}`)
})
