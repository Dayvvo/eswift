import { AuthProvider, IUser, UserRole } from '../utils/interfaces'

export const adminUsers: Array<IUser> = [
  {
    email: 'admin@eswift.com',
    provider: AuthProvider.EMAIL_SIGNUP,
    firstName: 'Admin',
    lastName: 'User',
    hash: 'adminuser',
    role: UserRole.ADMIN,
    isActive: true,
    isVerified: true,
  },
]
