import { getAllUsers } from "../models/userModel.js"

export const getAll  = async (req, res) => {
    const { role } = req.params

    try {
        const users = await getAllUsers({ role })
        res.send(users)
    } catch (error) {
        res.send(error.message)
    }
}