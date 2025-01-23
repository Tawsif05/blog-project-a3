import { z } from 'zod';

const blogValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required',
      })
      .max(30, 'Title must be less than 30 characters')
      .min(2, 'Title should be at least 5 characters'),

    content: z
      .string({
        required_error: 'Content is required',
      })
      .min(5, 'Content must be at least 5 characters'),
  }),
});

export const blogValidation = {
  blogValidationSchema,
};
