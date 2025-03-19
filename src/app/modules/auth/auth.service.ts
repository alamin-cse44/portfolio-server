import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { createToken } from './auth.utils';
import bcrypt from 'bcrypt';
import { sendEmail } from '../../utils/sendEmail';
import { TLoginUser } from './auth.interface';
import { User } from '../user/user.model';

const loginUserService = async (payload: TLoginUser) => {
  // check if user is exist with the email address
  const user = await User.findUserByEmail(payload?.email);

  if (!user) {
    throw new AppError(StatusCodes.FORBIDDEN, 'The User is not found!!!');
  }

  // check if user is blocked
  if (user.isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'The User is blocked!!!');
  }

  // check if password is correct
  const isPasswordCorrect = await User.isPasswordMatched(
    payload?.password,
    user?.password,
  );

  if (!isPasswordCorrect) {
    throw new AppError(StatusCodes.FORBIDDEN, 'The password is incorrect!!!');
  }

  // create token to send to the client
  let userId = user._id;
  userId = userId.toString();
  // console.log("user: ",userId);

  const jwtPayload = {
    userId,
    userEmail: user?.email,
    userRole: user?.role,
    phone: user?.phone,
    name: user?.name,
    image: user?.image,
    isBlocked: user?.isBlocked,
  };

  console.log(jwtPayload);

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_token_expires as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_token as string,
    config.jwt_refresh_token_expires as string,
  );

  return { accessToken, refreshToken };
};

const changePasswordService = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  console.log('userData : ', userData);
  // check if user is exist with the email address
  const user = await User.findUserByEmail(userData?.userEmail);

  if (!user) {
    throw new AppError(StatusCodes.FORBIDDEN, 'The User is not found!!!');
  }

  // check if user is blocked
  if (user.isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'The User is blocked!!!');
  }

  // check if password is correct
  const isPasswordCorrect = await User.isPasswordMatched(
    payload?.oldPassword,
    user?.password,
  );

  if (!isPasswordCorrect) {
    throw new AppError(StatusCodes.FORBIDDEN, 'The password is incorrect!!!');
  }

  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      email: userData?.userEmail,
      role: userData?.userRole,
    },
    {
      password: newHashedPassword,
    },
  );

  return null;
};

const refreshTokenService = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_token as string,
  ) as JwtPayload;

  const { userEmail, iat } = decoded;

  // check if user is exist with the email address
  const user = await User.findUserByEmail(userEmail);

  if (!user) {
    throw new AppError(StatusCodes.FORBIDDEN, 'The User is not found!!!');
  }

  // check if user is blocked
  if (user.isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'The User is blocked!!!');
  }

  // if (
  //   user.passwordChangedAt &&
  //   User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  // ) {
  //   throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized !');
  // }

  const jwtPayload = {
    userEmail: user?.email,
    userRole: user?.role,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    config.jwt_access_token_expires as string,
  );

  return {
    accessToken,
  };
};

const forgetPasswordService = async (userEmail: string) => {
  // check if user is exist with the email address
  const user = await User.findUserByEmail(userEmail);

  if (!user) {
    throw new AppError(StatusCodes.FORBIDDEN, 'The User is not found!!!');
  }

  // check if user is blocked
  if (user.isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'The User is blocked!!!');
  }

  const jwtPayload = {
    userEmail: user?.email,
    userRole: user?.role,
  };

  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_token as string,
    '10m',
  );

  const resetUILink = `${config.reset_pass_ui_link}?email=${user.email}&token=${resetToken}`;

  sendEmail(user.email, resetUILink);
  console.log(resetUILink);
};

const resetPasswordService = async (
  payload: { email: string; newPassword: string },
  token: string,
) => {
  // check if user is exist with the email address
  const user = await User.findUserByEmail(payload.email);

  if (!user) {
    throw new AppError(StatusCodes.FORBIDDEN, 'The User is not found!!!');
  }

  // check if user is blocked
  if (user.isBlocked) {
    throw new AppError(StatusCodes.FORBIDDEN, 'The User is blocked!!!');
  }

  // check if the token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_access_token as string,
  ) as JwtPayload;

  console.log(payload.email, decoded.userEmail);

  if (payload.email !== decoded.userEmail) {
    console.log(payload.email, decoded.userEmail);
    throw new AppError(StatusCodes.FORBIDDEN, 'You are forbidden!!');
  }

  const newHashedPassword = await bcrypt.hash(
    payload?.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    {
      email: decoded?.userEmail,
      role: decoded?.userRole,
    },
    {
      password: newHashedPassword,
    },
  );
};

export const AuthServices = {
  loginUserService,
  changePasswordService,
  refreshTokenService,
  forgetPasswordService,
  resetPasswordService,
};
