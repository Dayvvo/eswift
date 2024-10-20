import express from 'express'
import authController from '../controllers/authController'
import passport from 'passport'

const router = express.Router()

router.get(
  '/google',
  (req,res,next)=>{
    const state = req.query['state'] as string;
    passport.authenticate('google', {
      scope: ['email', 'profile'],
      ...state?{state}:{}
    })(req,res,next)
})

router.get(
  '/google/callback',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
    failureRedirect: `${process.env.BACKEND_URL}/login`,
  }),
  authController.googleAuthController
)

router.post('/login', authController.emailLoginAuthController)

export default router
