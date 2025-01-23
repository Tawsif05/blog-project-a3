import { Types } from 'mongoose';
import { TUser } from '../User/user.interface';
import User from '../User/user.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';

import config from '../../config';
import { createToken } from './auth.utils';

type UserPayload = {
  _id: Types.ObjectId;
  name: string;
  email: string;
};
const registerUserIntoDB = async (payload: TUser): Promise<UserPayload> => {
  const result = await User.create(payload);

  return result;
};
const loginUser = async (payload: { email: string; password: string }) => {
  // checking if the user is exist
  const user = await User.findOne({ email: payload?.email }).select(
    '+password'
  );

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  // checking the user is blocked
  const userStatus = user?.isBlocked;

  if (userStatus) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct

  const isPasswordMatched = await bcrypt.compare(
    payload?.password,
    user?.password
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Invalid credentials');
  }

  //creating token for access and sent to the client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    _id: user?._id,
  };

  const token = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return { token, user };
};

export const authService = {
  registerUserIntoDB,
  loginUser,
};
