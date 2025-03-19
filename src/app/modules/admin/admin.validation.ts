import { z } from 'zod';
import { UserStatus } from '../user/user.constant';

const updateUserRoleValidationSchema = z.object({
  body: z.object({
    role: z.enum([...UserStatus] as [string, ...string[]]),
  }),
});

export const AdminValidations = {
    updateUserRoleValidationSchema,
};
