import { Router } from "express"
import { verifyToken } from "../middleware/authMiddleware.js"
import { index, usersDashboard, datesDashboard } from "../controllers/userController.js"
import { appoinment } from "../controllers/agendaController.js"

const router = Router()

router.get("/", verifyToken, index)
router.get("/dashboard/users", verifyToken, usersDashboard)
router.get("/dashboard/dates", verifyToken, datesDashboard)
router.get("/agendar", verifyToken, appoinment)

export default router