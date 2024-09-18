import express from 'express'
import { getPath } from '../controllers/pathController.js'
const router = express.Router()

router.post('/', getPath)


export default router