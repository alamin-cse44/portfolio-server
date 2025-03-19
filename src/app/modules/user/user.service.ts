import { StatusCodes } from 'http-status-codes';
import QeryBuilder from '../../builder/QeryBuilder';
import AppError from '../../errors/AppError';
import { userSearchableFields } from './user.constant';
import { IUser } from './user.interface';
import { User } from './user.model';

const registerUserIntoDB = async (payload: IUser) => {
  const result = await User.create(payload);

  return result;
};

const getSignleUserByIdFromDB = async (email: string) => {
  const result = await User.findUserByEmail(email);

  return result;
};

const updateMeService = async (
  id: string,
  payload: { email?: string; phone?: string; name?: string; image?: string },
) => {
  const user = await User.isUserExistById(id);
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

const getMeService = async (id: string) => {
  const result = await User.isUserExistById(id);

  return result;
};

export const UserServices = {
  registerUserIntoDB,
  getSignleUserByIdFromDB,
  updateMeService,
  getMeService,
};
