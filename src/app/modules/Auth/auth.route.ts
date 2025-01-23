import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { userValidation } from '../User/user.validation';
import { authController } from './auth.controller';
import { authValidation } from './auth.validation';

const authRouter = Router();
authRouter.post(
  '/register',
  validateRequest(userValidation.userValidationSchema),
  authController.registerUser
);
authRouter.post(
  '/login',
  validateRequest(authValidation.loginValidationSchema),
  authController.loginUser
);
export default authRouter;
