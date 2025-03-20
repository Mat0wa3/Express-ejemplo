import { Router } from "express"
import { verifyToken } from "../middleware/authMiddleware.js"
import { index } from "../controllers/userController.js"

const router = Router()

router.get("/", verifyToken, index)

export default router