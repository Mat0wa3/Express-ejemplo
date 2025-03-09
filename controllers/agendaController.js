import { create, update, remove, getAll, getById } from "../models/agendaModel.js"

export const createDate = async (req, res) => {
  try {
    const result = await create(req.body)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const index = async (req, res) => {
  res.status(200).render("agendar")
}

export const updateDate = async (req, res) => {
  const { id } = req.params
  const input = req.body
  try {
    const result = await update({ id, input })
    console.log(result)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const removeDate = async (req, res) => {
  const { id } = req.params
  try {
    const result = await remove({ id })    
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const getDateById = async (req, res) => {
  try {
    const result = await getById(req.params)
    res.status(200).send(result)
  } catch (error) {
    res.status(400).send(error.message)
  }
}

export const getAllDates = async (req, res) => {
  try {
    const result = await getAll()
    res.status(200).render('dashboard/dates', result)
  } catch (error) {
    res.status(500).send(error.message)
  }
}