import express, { Request, Response } from 'express'
import axios from 'axios'
import authController from '../controllers/authController'
import passport from 'passport'
import authRoutes from './authRoutes'

const router = express.Router()

router.use('/auth', authRoutes)

export default router
