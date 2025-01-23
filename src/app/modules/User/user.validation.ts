import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    email: z
      .string({
        required_error: 'Email is required !! Or provide a valid email',
      })
      .email(),
    password: z
      .string({
        required_error: 'Password is required',
      })
      .min(3, 'Password must be more than 3 characters or longer !!')
      .max(20, { message: 'Password must be less than 20 characters !!' }),
  }),
});

export const userValidation = {
  userValidationSchema,
};
