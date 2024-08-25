import next from 'next'

import dotenv from 'dotenv'
import express, { ErrorRequestHandler } from 'express'
import logger from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import compress from 'compression'
import session from 'express-session'
import { appConfig } from './utils/config'

import indexRoutes from './routes/indexRoutes'
import passport from 'passport'
import { NextParsedUrlQuery } from 'next/dist/server/request-meta'

const app = express()
const dev = process.env.NODE_ENV !== 'production'
const hostname = process.env.HOSTName || 'localhost'
const port = (process.env.PORT || 3000) as number

const nextApp = next({ dev, hostname, port })
const handle = nextApp.getRequestHandler()
dotenv.config()
import crypto from 'crypto'
const secret = crypto.randomBytes(64).toString('hex')

nextApp.prepare().then(() => {
  
  let config = new appConfig()

  app.use(compress())

  app.use(passport.initialize())

  config.initializePassportStrategy()

  config.connectDB()

  // Initialize passport

  app.use(
    session({
      secret: 'keyboard cat',
      resave: false, // don't save session if unmodified
      saveUninitialized: true, // don't create session until something stored
    })
  )

  // Init Middleware
  app.use(logger('dev'))

  app.use(express.json())

  app.use(cors())

  app.use(express.urlencoded({ extended: false }))

  app.use(cookieParser())

  app.use('/api', indexRoutes)

  app.get('*', (req, res, next) => {
    if (req.url.startsWith('/api')) {
      console.log('it starts with')
      return next()
    }
    console.log('it dont starts with')
    return handle(req, res)
  })

  app.get('/', async (req, res) => {
    await nextApp.render(req, res, '/', req.query as NextParsedUrlQuery)
  });

  app.use(
    express.json({
      limit: '5mb',
    })
  )

  const PORT = process.env.PORT || 5500

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
})
