import express from 'express'
import { PORT } from './config.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import authRoutes from './routes/authRoutes.js'
import agendaRoutes from './routes/agendaRoutes.js'
import webRoutes from './routes/webRoutes.js'
import chalk from 'chalk'

const app = express()

// middlewares
app.disable('x-powered-by')
app.set('view engine', 'ejs')
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public', { maxAge: '1d' }))
app.use((req, res, next) => {
  const startTime = Date.now()

  // Sobrescribir res.send para capturar la respuesta
  const originalSend = res.send
  res.send = function (body) {
    const duration = Date.now() - startTime

    // Función para determinar el color del statusCode
    const getStatusCodeColor = (code) =>
      code >= 500 ? chalk.red("[" + code + "]") :
      code >= 400 ? chalk.yellow("[" + code + "]") :
      code >= 300 ? chalk.blueBright("[" + code + "]") :
      code >= 200 ? chalk.greenBright("[" + code + "]") :
      chalk.gray("[" + code + "]")

    // Formatear la hora
    const formattedTime = new Date().toISOString().slice(11, 19)

    // Registrar la solicitud con colores dinámicos
    console.log(
      `${chalk.gray(formattedTime)} ${getStatusCodeColor(res.statusCode)} ${chalk.white(req.method + req.originalUrl)} ${chalk.gray(duration + "ms")}`
    )

    return originalSend.call(this, body)
  }

  next()
})

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
app.listen(PORT, () => console.log(chalk.bgBlue.white(" INFO ") + chalk.white(" Servidor iniciado" + chalk.yellowBright("\n - http://localhost:" + PORT))) )