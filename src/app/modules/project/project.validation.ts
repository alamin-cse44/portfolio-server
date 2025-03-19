import { z } from 'zod';

const createListingValidaitonSchema = z.object({
  body: z.object({
    apartmentType: z.string({ required_error: 'Must provide Apartment Type' }),
    landLord: z.string({ required_error: 'Must provide a LandLord' }),
    location: z.string({ required_error: 'location must be provided' }),
    description: z.string({ required_error: 'description must be provided' }),
    price: z.number().min(1).max(1000000),
    bedrooms: z.number().min(1).max(30),
    category: z.string({ required_error: 'category must be provided' }),
  }),
});

const updateListingValidaitonSchema = z.object({
  body: z.object({
    apartmentType: z
      .string({ required_error: 'Must provide Apartment Type' })
      .optional(),
    landLord: z
      .string({ required_error: 'Must provide a LandLord' })
      .optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    price: z.number().min(1).max(1000000).optional(),
    bedrooms: z.number().min(1).max(30).optional(),
    category: z
      .string({ required_error: 'category must be provided' })
      .optional(),
  }),
});

export const ListingValidations = {
  createListingValidaitonSchema,
  updateListingValidaitonSchema,
};
