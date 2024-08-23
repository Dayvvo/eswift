import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    tenantId: {
      type: String,
    },
    avatar: {
      type: String,
    },
    provider: {
      type: String,
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
      default: "Guest",
    },
    isActive: {
      type: Boolean,
      default: true
    }    
  },
  { timestamps: true }
)

export default mongoose.model("user", UserSchema)


