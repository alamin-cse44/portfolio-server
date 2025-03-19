import { z } from 'zod';

const createSkillValidaitonSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Must provide title' }),
    icon: z.string({ required_error: 'Must provide skill icon' }),
  }),
});

const updateSkillValidaitonSchema = z.object({
  body: z.object({
    title: z.string({ required_error: 'Must provide title' }).optional(),
    icon: z.string({ required_error: 'Must provide skill icon' }).optional(),
  }),
});

export const SkillValidations = {
  createSkillValidaitonSchema,
  updateSkillValidaitonSchema,
};
