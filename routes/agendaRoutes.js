import { Router } from "express"
import { getAllDates, createDate, updateDate, removeDate, getDateById } from "../controllers/agendaController.js"

const router = Router()

router.get('/', getAllDates)
router.get('/:id', getDateById)
router.post('/create', createDate)
router.put('/:id', updateDate)
router.delete('/:id', removeDate)

export default router