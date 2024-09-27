import { Schema, model } from 'mongoose'
import * as argon from 'argon2'
import { AuthProvider, IUser, UserRole } from '../utils/interfaces'
import { generateRefCode } from '../utils/helperFunctions/generateRefCode'

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
    propertyCount: {
      type: Number,
      default: 0,
    },
    role: {
      type: String,
      enum: UserRole,
      default: UserRole.GUEST,
    },
    refCode: {
      type: String,
    },
    refCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    verification: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

UserSchema.methods.increasePropertyCount = function () {
  let propsCount = this.propertyCount;
  propsCount += 1;
  this.propertyCount = propsCount;
  return this.save();
};
UserSchema.methods.decreasePropertyCount = function () {
  let propsCount = this.propertyCount;
  propsCount -= 1;
  this.propertyCount = propsCount;
  return this.save();
};

UserSchema.method("matchPassword", async function (enteredPassword) {
  const isMatch = await argon.verify(this.hash as string, enteredPassword);
  return isMatch;
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("hash")) {
    next();
  }
  this.hash = await argon.hash(this.hash as string)

  this.refCode = generateRefCode(8)
})

export default model("user", UserSchema);
