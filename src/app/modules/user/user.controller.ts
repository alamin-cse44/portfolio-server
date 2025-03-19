import { Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';

const registerUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.registerUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const getSignleUserById = catchAsync(async (req, res) => {
  const { email } = req.params;

  const result = await UserServices.getSignleUserByIdFromDB(email);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User retrieved successfully',
    data: result,
  });
});

const updateMe = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await UserServices.updateMeService(userId, req.body);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is updated successfully',
    data: result,
  });
});

const getMe = catchAsync(async (req, res) => {
  const { userId } = req.user;

  const result = await UserServices.getMeService(userId);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is retrieved successfully',
    data: result,
  });
});

export const UserControllers = {
  registerUser,
  getSignleUserById,
  updateMe,
  getMe,
};
