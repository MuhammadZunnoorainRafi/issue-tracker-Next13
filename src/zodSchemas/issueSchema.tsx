import { z } from 'zod';

export const issueSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  status: z
    .enum(['OPEN', 'IN_PROGRESS', 'CLOSED'], {
      required_error: 'Status is required',
    })
    .optional(),
});
