import Joi from 'joi'
import { ILoginValidation } from './interface.validation'

export const validateLoginData = (login: ILoginValidation) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(36).required(),
  })

  return loginSchema.validate(login)
}
