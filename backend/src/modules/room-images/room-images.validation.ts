import { z } from 'zod';

export const roomIdParamSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});

export const imageIdSchema = z.object({
  params: z.object({
    id: z.string().min(1),
    imageId: z.string().min(1),
  }),
});

export const updateImageSchema = z.object({
  params: z.object({
    id: z.string().min(1),
    imageId: z.string().min(1),
  }),
  body: z.object({
    caption: z.string().optional(),
    isPrimary: z.boolean().optional(),
    sortOrder: z.number().int().optional(),
  }),
});
