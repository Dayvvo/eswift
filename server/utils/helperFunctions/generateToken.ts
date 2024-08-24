import Jwt from 'jsonwebtoken'
import { ObjectId } from 'mongoose'

const generateToken = (id: ObjectId) => {
  return Jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

export default generateToken