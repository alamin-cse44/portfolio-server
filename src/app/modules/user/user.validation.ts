import { z } from 'zod';

const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(50),
    phone: z.string({ required_error: 'Please enter your phone number' }),
  }),
});


export const UserValidations = {
  createUserValidationSchema,
};
