import jwt from 'jsonwebtoken'
import User from '../models/User'
import { generalRequestBody } from '../utils/interfaces/types'
import { Request, Response } from 'express'
import { ILoginValidation } from '../utils/interfaces/interface.validation'
import { validateLoginData } from '../utils/validation'
import { adminUsers } from '../data'
import generateToken from '../utils/helperFunctions/generateToken'

class AuthController {
  handleCreateUser = async (personalData: generalRequestBody) => {
    const newUser = await new User({
      ...personalData,
    }).save()
    return newUser
  }

  jwtSignAndRedirect = (res: Response, user: generalRequestBody) => {
    const payload = {
      user: {
        id: user._id,
      },
    }
    const payloadStringified = JSON.stringify({
      token: jwt.sign(payload, process.env.JWT_SECRET as string, {
        expiresIn: 60 * 2400,
      }),
      user,
    })
    console.log('payload stringified', payloadStringified)
    //set user information to cookie
    res.cookie('auth-cookie', payloadStringified)
    res.redirect('/')
  }

  googleAuthController = async (req: Request, res: Response) => {
    try {
      const profile = req?.user as generalRequestBody
      this.jwtSignAndRedirect(res, profile)
    } catch (err) {
      console.log('err in google auth callback', err)
      res.status(500).send('Server error')
    }
  }

  emailLoginAuthController = async (req: Request, res: Response) => {
    try {
      const body: ILoginValidation = req.body
      const validate = validateLoginData(body)
      const { error } = validate
      if (error) {
        return res.status(400).json(error.details[0])
      }
      const { email, password } = body
      const user = await User.findOne({ email })

      if (user && user.matchPassword && (await user?.matchPassword(password))) {
        res.json({
          statusCode: 200,
          message: 'Successful',
          data: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
          },
        })
      } else {
        res
          .status(401)
          .json({ statusCode: 401, message: 'Wrong Email or Password' })
      }
    } catch (err) {
      console.log('Error in email login', err)
      res.status(500).send('Internal Server Error')
    }
  }

  adminSeeder = async (req: Request, res: Response) => {
    adminUsers.forEach((adminUser) => {
      const newUser = new User(adminUser)
      newUser.save()
    })

    console.log(`Seed successful`)
    res.send(`SEED COMPLETE!!`)
  }
}

let authController = new AuthController()

export default authController
