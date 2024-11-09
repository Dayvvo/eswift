import { ObjectId } from "mongoose";

export enum UserRole {
  CLIENT = "CLIENT",
  ADMIN = "ADMIN",
  AFFILIATE = "AFFILIATE",
  AGENT = "AGENT",
  GUEST = "GUEST",
  STAFF = "STAFF",
}

export enum AuthProvider {
  GOOGLE = "google",
  EMAIL_SIGNUP = "email_signup",
}

export interface IUser {
  _id: ObjectId;
  tenantId?: string;
  email: string;
  avatar?: string;
  provider?: AuthProvider;
  lastName: string;
  firstName: string;
  refCode: string;
  refCount: number;
  hash?: string;
  propertyCount: number;
  role: UserRole;
  isActive: boolean;
  passwordUpdated: boolean;
  referrer: ObjectId;
  verification: "pending" | "verified" | "rejected";
  phoneNumber: string;
  address: string;
  matchPassword?: FunctionConstructor;
  increasePropertyCount?: FunctionConstructor;
  decreasePropertyCount?: FunctionConstructor;
}

export interface IUserInRequest extends IUser {
  matchPassword: FunctionConstructor;
  increasePropertyCount: FunctionConstructor;
  decreasePropertyCount: FunctionConstructor;
}
