import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config.js'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    req.session = { user: null }

    try {
        const decoded = jwt.verify(token, SECRET_KEY)
        req.session.user = decoded
    } catch {}  
    next()
}