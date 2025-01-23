import { z } from 'zod';
import { USER_ROLE } from './auth.interface';
const loginValidationSchema = z.object({
  body: z.object({
    email: z
      .string({
        required_error: 'Email is required !',
      })
      .email(),
    password: z.string({ required_error: 'Password is required !' }),
  }),
});

export const authValidation = {
  loginValidationSchema,
};
export type TUserRole = keyof typeof USER_ROLE;
