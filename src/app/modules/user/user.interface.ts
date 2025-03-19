import { Model } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  image: string;
}

export interface UserModel extends Model<IUser> {
  isUserExistById(id: string): Promise<IUser>;
  findUserByEmail(email: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
