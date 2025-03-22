import { Router } from "express"
import { verifyToken } from "../middleware/authMiddleware.js"
import { index, usersDashboard, datesDashboard } from "../controllers/userController.js"

const router = Router()

router.get("/", verifyToken, index)
router.get("/dashboard/users", verifyToken, usersDashboard)
router.get("/dashboard/dates", verifyToken, datesDashboard)

export default router