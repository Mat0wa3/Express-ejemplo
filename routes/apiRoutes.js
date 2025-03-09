import { Router } from "express"
import { getAll } from "../controllers/ApiUserController.js"

const router = Router()

router.get("/dashboard/users/:role", getAll)

export default router