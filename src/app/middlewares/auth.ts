import { StatusCodes } from 'http-status-codes';
import AppError from '../errors/AppError';
import { TUserRole } from '../modules/Auth/auth.validation';
import catchAsync from '../utils/catchAsync';
import { NextFunction, Request, Response } from 'express';
import config from '../config';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from '../modules/User/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const getToken = req.headers?.authorization;
    if (!getToken) {
      throw new AppError(
        StatusCodes.UNAUTHORIZED,
        `You are not authorized to access this route `
      );
    }
    const token = getToken.split(' ')[1] || getToken;

    
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;
    
    const { email, role } = decoded;
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
    }
    
    if (user.isBlocked) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked');
    }
    if (requiredRoles.length > 0 && !requiredRoles.includes(role)) {
      throw new AppError(
        StatusCodes.FORBIDDEN,
        'You are not allowed to access this route'
      );
    }
    req.user = decoded;
    
    next();
  });
};
export default auth;
