import { Router } from "express"
import { verifyToken } from "../middleware/authMiddleware.js"
import { index, logout, getAll, userDelete, userUpdate, getUser } from "../controllers/userController.js"

const router = Router()

router.get("/", verifyToken, index)
router.get("/dashboard/users", getAll)
router.post('/logout', logout)
router.get("/dashboard/users/:id", getUser)
router.delete("/dashboard/users/:id", userDelete)
router.put("/dashboard/users/:id", userUpdate)

export default router