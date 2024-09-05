export enum UserRole {
  CLIENT = 'CLIENT',
  ADMIN = 'ADMIN',
  GUEST = 'GUEST',
}

export enum AuthProvider {
  GOOGLE = 'google',
  EMAIL_SIGNUP = 'email_signup',
}

export interface IUser {
  tenantId?: string
  email: string
  avatar?: string
  provider?: AuthProvider
  lastName: string
  firstName: string
  hash?: string
  role: UserRole
  isActive: boolean
  verification: 'pending' | 'verified' | 'rejected'
  matchPassword?: FunctionConstructor
}
