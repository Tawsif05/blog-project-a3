import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { authService } from './auth.service';
import { Request, Response } from 'express';

const registerUser = catchAsync(async (req, res) => {
  const result = await authService.registerUserIntoDB(req.body);
  const { _id, name, email } = result;
  sendResponse(res, {
    success: true,
    message: 'User registered successfully',
    statusCode: StatusCodes.CREATED,
    data: { _id, name, email },
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.loginUser(req.body);

  sendResponse(res, {
    success: true,
    message: 'Login successful',
    statusCode: StatusCodes.OK,
    data: {
      token: result.token,
    },
  });
});

export const authController = {
  registerUser,
  loginUser,
};
