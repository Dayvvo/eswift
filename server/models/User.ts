import { Schema, model } from 'mongoose'
import * as argon from 'argon2'
import { AuthProvider, IUser, UserRole } from '../utils/interfaces'

const UserSchema = new Schema<IUser>(
  {
    tenantId: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    avatar: {
      type: String,
      default: `https://res.cloudinary.com/dnpvndlmy/image/upload/v1724890974/user-3296_v28jnk.svg`,
    },
    provider: {
      type: String,
      enum: AuthProvider,
      default: AuthProvider.EMAIL_SIGNUP,
    },
    lastName: {
      type: String,
      lowercase: true,
    },
    hash: {
      type: String,
    },
    firstName: {
      type: String,
      lowercase: true,
    },
    role: {
      type: String,
      enum: UserRole,
      default: UserRole.GUEST,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
)

UserSchema.method('matchPassword', async function (enteredPassword) {
  const isMatch = await argon.verify(this.hash as string, enteredPassword)
  console.log('matching...')
  console.log(isMatch)

  return isMatch
})

UserSchema.pre('save', async function (next) {
  if (!this.isModified('hash')) {
    next()
  }

  this.hash = await argon.hash(this.hash as string)
})

export default model('user', UserSchema)
