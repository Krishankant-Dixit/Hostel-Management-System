import { z } from 'zod';

export const createRoomSchema = z.object({
  body: z.object({
    buildingId: z.string().min(1),
    roomNumber: z.string().min(1),
    floor: z.number().int().optional(),
    capacity: z.number().int().min(1).optional(),
    hasStudyTable: z.boolean().optional(),
    hasWardrobe: z.boolean().optional(),
    hasAttachedWashroom: z.boolean().optional(),
    hasFan: z.boolean().optional(),
    status: z.enum(['available', 'occupied', 'maintenance', 'reserved']).optional(),
  }),
});

export const updateRoomSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({
    floor: z.number().int().optional(),
    capacity: z.number().int().min(1).optional(),
    hasStudyTable: z.boolean().optional(),
    hasWardrobe: z.boolean().optional(),
    hasAttachedWashroom: z.boolean().optional(),
    hasFan: z.boolean().optional(),
    status: z.enum(['available', 'occupied', 'maintenance', 'reserved']).optional(),
  }),
});

export const roomIdSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});

export const createBuildingSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    code: z.string().min(1),
  }),
});
