import { getAllUsers, deleteUser, updateUser, getUserById } from "../models/userModel.js"

export const getAll = async (req, res) => {
  try {
    const users = await getAllUsers({})
    res.status(200).render("dashboard/users", users)
  } catch {
    res.status(500).send({ message: "Internal server error" })
  }
}

export const getUser = async (req, res) => {
  const { id } = req.params
  try {
    const user = await getUserById({ id })
    res.status(200).send(user)
  } catch {
    res.status(500).send({ message: "Internal server error" })
  }
}

export const index = async (req, res) => {
  const user = req.session.user
  res.status(200).render("index", user)
}

export const userDelete = async (req, res) => {
  const { id } = req.params
  try {
    await deleteUser({ id })
    res.status(204).send({ message: "User deleted" })
  } catch {
    res.status(500).send({ message: "Internal server error" })
  }
}

export const userUpdate = async (req, res) => {
  const { id } = req.params
  const input = req.body
  try {
    await updateUser({ id, input })
    res.status(200).send({ message: "User updated" })
  } catch {
    res.status(500).send({ message: "Internal server error" })
  }
}