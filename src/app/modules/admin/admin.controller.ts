import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AdminServices } from './admin.service';

const getAllUsers = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllUsersFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Users retrieved successfully',
    data: result,
  });
});

const updateRole = catchAsync(async (req, res) => {
  const id = req.params.id;

  console.log("res", id, req.body)
  const result = await AdminServices.updateRoleService(id, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User role is updated succesfully',
    data: result,
  });
});

const blockSignleUserById = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminServices.blockSignleUserByIdFromDB(id);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User blocked successfully',
    data: result,
  });
});

const getAllListings = catchAsync(async (req, res) => {
  const result = await AdminServices.getAllListingsFromDB(req.query);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Listings are retrieved successfully',
    data: result,
  });
});

export const AdminControllers = {
  updateRole,
  getAllUsers,
  blockSignleUserById,
  getAllListings,
};
