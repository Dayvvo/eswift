import { Schema, model } from 'mongoose'
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

export default model('user', UserSchema)
