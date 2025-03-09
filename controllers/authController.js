import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { SECRET_KEY } from '../config.js'
import { findUserByEmail, createUser } from '../models/userModel.js'

const generateToken = (user) => {
    return jwt.sign({ 
        id: user.id, 
        username: user.name, 
        email: user.email, 
        role: user.role
    }, SECRET_KEY, { expiresIn: '1h' })
}

export const register = async (req, res) => {
    const input = req.body

    try {
        const user = await createUser(input)
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
}

export const login = async (req, res) => {
    const { username, password } = req.body
    const user = await findUserByEmail(username)
    if (!user) return res.status(404).send({ message: "user not found" })

    const isValid = await bcrypt.compare(password, user.pass)
    if (!isValid) return res.status(401).send({ message: "invalid password" })

    const token = generateToken(user)

    try {
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60
        }).send({ user, token })
    } catch (error) {
        res.status(400).send(error.message)
    }
}