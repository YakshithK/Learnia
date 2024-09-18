import express from 'express'
import cors from 'cors'
import paths from './routes/paths.js'
import { fileURLToPath } from 'url'
import path from 'path'
const port = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false}))

// setup static folder
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/paths', paths)


app.listen(port, () => console.log(`Server is running on port ${port}`))