import { Router } from "express"
import { getAll, userDelete, userUpdate, getUser, getEmployes } from "../controllers/userController.js"

const router = Router()

router.get("/", getAll)
router.get("/employes/", getEmployes)
router.get("/:id", getUser)
router.delete("/:id", userDelete)
router.put("/:id", userUpdate)

export default router