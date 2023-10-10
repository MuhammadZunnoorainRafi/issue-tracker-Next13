import { prismaDB } from '@/utils/prismaDB';
import { issueSchema } from '@/zodSchemas/issueSchema';
import { NextRequest, NextResponse } from 'next/server';
import { fromZodError } from 'zod-validation-error';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = issueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(fromZodError(validation.error), { status: 400 });
  }
  const newIssue = await prismaDB.issue.create({
    data: {
      title: body.title,
      description: body.description,
    },
  });
  return NextResponse.json(newIssue, { status: 201 });
}
