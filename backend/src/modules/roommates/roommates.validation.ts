import { z } from 'zod';

export const assignSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({ userId: z.string().min(1) }),
});

export const unassignSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({ userId: z.string().min(1) }),
});

export const roomIdParamSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});
