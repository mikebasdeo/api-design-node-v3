import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'

export const app = express()
const router = express.Router()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

// MIDDLEWARES

const myMiddleware = (req, res, next) => {
  console.log('hello middleware')
  next()
}

// ROUTERS
router.get('/me', (req, res) => {
  res.send({ me: 'hello' })
})

// MAIN APP

app.use('/api', router)

app.get('/', myMiddleware, (req, res) => {
  res.send({ message: 'Hello' })
})

app.post('/', (req, res) => {
  console.log(req.body)
  res.send({ message: 'ok' })
})

app.get('/data', (req, res) => {
  res.send({ message: 'hello' })
})

app.post('/data', (req, res) => {
  res.send(req.body)
})

// START BUTTON

export const start = () => {
  app.listen(3000, () => {
    console.log('server is on 3000')
  })
}
