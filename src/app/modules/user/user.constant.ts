export const USER_ROLE = {
  admin: 'admin',
  user: 'user',
} as const;

export const userSearchableFields = ['name', 'email', 'role'];

export const UserStatus = ['admin', 'user'];