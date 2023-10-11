import { prismaDB } from '@/utils/prismaDB';
import { issueSchema } from '@/zodSchemas/issueSchema';
import { NextRequest, NextResponse } from 'next/server';
import { fromZodError } from 'zod-validation-error';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/authOptions';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session)
    return NextResponse.json({ error: 'Not Authorized' }, { status: 401 });

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
