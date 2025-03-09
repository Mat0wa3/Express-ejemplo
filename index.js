import express from 'express'
import { PORT } from './config.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import agendaRoutes from './routes/agendaRoutes.js'
import apiRoutes from './routes/apiRoutes.js'

const app = express()
app.disable('x-powered-by')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))

app.use('/', userRoutes)
app.use('/api', apiRoutes)
app.use('/auth', authRoutes)
app.use('/', agendaRoutes)

//app start
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))