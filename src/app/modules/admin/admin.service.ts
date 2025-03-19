import { User } from '../user/user.model';
import { userSearchableFields } from '../user/user.constant';
import QeryBuilder from '../../builder/QeryBuilder';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';

const getAllUsersFromDB = async (query: Record<string, unknown>) => {
  const userQuery = new QeryBuilder(User.find(), query)
    .search(userSearchableFields)
    .filter()
    .sort()
    .sortByAscOrDesc()
    .paginate()
    .fields();

  const result = await userQuery.modelQuery;

  return result;
};

const updateRoleService = async (id: string, payload: { role: string }) => {
  // console.log({id, payload})
  const result = await User.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const blockSignleUserByIdFromDB = async (id: string) => {
  const user = await User.isUserExistById(id);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }
  console.log('service');
  const result = await User.findByIdAndUpdate(
    id,
    { isBlocked: !user?.isBlocked },
    { new: true, runValidators: true },
  );

  return result;
};

export const AdminServices = {
  getAllUsersFromDB,
  updateRoleService,
  blockSignleUserByIdFromDB,
};
