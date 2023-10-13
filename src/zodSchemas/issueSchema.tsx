import { z } from 'zod';

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

export const patchIssueSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255).optional(),
  description: z
    .string()
    .min(1, 'Description is required')
    .max(60000)
    .optional(),
  status: z
    .enum(['OPEN', 'IN_PROGRESS', 'CLOSED'], {
      required_error: 'Status is required',
    })
    .optional(),
  assignedToUserId: z
    .string()
    .min(1, 'User Id is required')
    .max(255)
    .optional()
    .nullable(),
});
