import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const tokenWithBearer = req.headers.authorization?.split(' ')[0];
    let token;
    if (tokenWithBearer === 'Bearer') {
      token = req.headers.authorization?.split(' ')[1];
    } else {
      token = req.headers.authorization;
    }
    // console.log('token :', token);
    
    // check the token is exist
    if (!token) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'You are not Authorized!!!');
    }

    // check if the token is valid
    let decoded;
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_token as string,
      ) as JwtPayload;
    } catch (error) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Token is invalid!!!');
    }

    const { userId, userEmail, userRole, iat } = decoded;

    // console.log('role: ',userRole);
    // console.log('requiredRole: ' + requiredRoles);

    // check if user is exist with the email address
    const user = await User.findUserByEmail(userEmail);

    if (!user) {
      throw new AppError(StatusCodes.FORBIDDEN, 'The User is not found!!!');
    }

    // check if user is blocked
    if (user.isBlocked) {
      throw new AppError(StatusCodes.FORBIDDEN, 'The User is blocked!!!');
    }

    if (requiredRoles && !requiredRoles.includes(userRole)) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'You are not allowed to this action!!!',
      );
    }

    console.log('pass the cases');

    // decoded undefined
    req.user = decoded;

    next();
  });
};

export default auth;
