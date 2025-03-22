import express from 'express'
import { PORT } from './config.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import agendaRoutes from './routes/agendaRoutes.js'
import webRoutes from './routes/webRoutes.js'

const app = express()

// middlewares
app.disable('x-powered-by')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public', { maxAge: '1d' }));

// Rutas
app.use('/', webRoutes)
app.use('/auth', authRoutes)
app.use('/users', userRoutes)
app.use('/dates', agendaRoutes)

// Manejo de errores
app.use((req, res) => {
  res.status(404).render('404')
})
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).send('Internal server error')
})

// Iniciar servidor
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))