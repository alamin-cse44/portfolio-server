import { z } from 'zod';

const createProjectValidaitonSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Must provide title' }),
    user: z.string({ required_error: 'Must provide a user' }),
    briefDescription: z.string({
      required_error: 'Brief Description must be provided',
    }),
    service: z.string({ required_error: 'service must be provided' }),
    description: z.string({ required_error: 'description must be provided' }),
  }),
});

const updateProjectValidaitonSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Must provide title' }).optional(),
    user: z.string({ required_error: 'Must provide a user' }).optional(),
    briefDescription: z
      .string({
        required_error: 'Brief Description must be provided',
      })
      .optional(),
    service: z
      .string({ required_error: 'service must be provided' })
      .optional(),
    description: z
      .string({ required_error: 'description must be provided' })
      .optional(),
  }),
});

export const ProjectValidations = {
  createProjectValidaitonSchema,
  updateProjectValidaitonSchema,
};
