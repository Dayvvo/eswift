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
  refCode: string
  refCount: number
  hash?: string
  role: UserRole
  isActive: boolean
  verification: 'pending' | 'verified' | 'rejected'
  matchPassword?: FunctionConstructor
}
