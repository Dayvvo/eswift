import express from 'express'
import authController from '../controllers/authController'
import passport from 'passport'
import { isAuth } from '../utils/middleware'
import propertyController from '../controllers/propertyController'

const router = express.Router()

router.get(
  '/google/callback',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    failureRedirect: `${process.env.FRONTEND_URL}`,
  }),
  authController.googleAuthController
)

router.post('/login', authController.emailLoginAuthController)

router
  .route('/')
  .post(isAuth, propertyController.createProperty)
  .get(isAuth, propertyController.getCreatedProperties)

router.route('/:id').get(isAuth, propertyController.getPropertyById)
export default router
