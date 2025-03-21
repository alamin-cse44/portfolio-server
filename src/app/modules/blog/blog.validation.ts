import { z } from 'zod';

const createBlogValidaitonSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Must provide title' }),
    content: z.string({ required_error: 'Must provide content' }),
    image: z.string({ required_error: 'Must provide image' }),
  }),
});

const updateBlogValidaitonSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Must provide title' }).optional(),
    content: z.string({ required_error: 'Must provide content' }).optional(),
    image: z.string({ required_error: 'Must provide image' }).optional(),
  }),
});

export const BlogValidations = {
  createBlogValidaitonSchema,
  updateBlogValidaitonSchema,
};
