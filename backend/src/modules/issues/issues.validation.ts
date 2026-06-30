import { z } from 'zod';

export const createIssueSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
  body: z.object({
    title: z.string().min(3).max(200),
    description: z.string().min(10),
    categoryId: z.string().min(1).optional(),
    facilityType: z
      .enum(['study_table', 'wardrobe', 'attached_washroom', 'fan', 'general', 'other'])
      .optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  }),
});

export const updateIssueSchema = z.object({
  params: z.object({ issueId: z.string().min(1) }),
  body: z.object({
    status: z.enum(['open', 'in_progress', 'resolved', 'closed', 'rejected']).optional(),
    assignedToId: z.string().min(1).optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
    note: z.string().optional(),
  }),
});

export const issueIdSchema = z.object({
  params: z.object({ issueId: z.string().min(1) }),
});

export const roomIssuesParamSchema = z.object({
  params: z.object({ id: z.string().min(1) }),
});

export const listIssuesQuerySchema = z.object({
  query: z.object({
    status: z.enum(['open', 'in_progress', 'resolved', 'closed', 'rejected']).optional(),
    roomId: z.string().optional(),
    priority: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  }),
});
