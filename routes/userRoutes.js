import { Router } from "express"
import { getAll, userDelete, userUpdate, getUser } from "../controllers/userController.js"

const router = Router()

router.get("/", getAll)
router.get("/:id", getUser)
router.delete("/:id", userDelete)
router.put("/:id", userUpdate)

export default router