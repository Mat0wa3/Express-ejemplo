import { Router } from "express"
import { getAllDates, index, createDate, updateDate, removeDate, getDateById } from "../controllers/agendaController.js"

const router = Router()

router.get('/dashboard/dates', getAllDates)
router.get('/agendar', index)
router.post('/dashboard/dates', createDate)
router.put('/dashboard/dates/:id', updateDate)
router.delete('/dashboard/dates/:id', removeDate)
router.get('/dashboard/dates/:id', getDateById)

export default router