import { prismaDB } from '@/utils/prismaDB';
import { patchIssueSchema, issueSchema } from '@/zodSchemas/issueSchema';
import { NextRequest, NextResponse } from 'next/server';
import { fromZodError } from 'zod-validation-error';
import { authOptions } from '../../auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: 'Not Authorized' }, { status: 401 });

  const body = await request.json();
  const { title, description, status, assignedToUserId } = body;

  const validation = patchIssueSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(fromZodError(validation.error), { status: 400 });
  }

  if (assignedToUserId) {
    const user = await prismaDB.user.findUnique({
      where: {
        id: assignedToUserId,
      },
    });
    if (!user) {
      return NextResponse.json({ error: 'Invalid User' }, { status: 400 });
    }
  }

  const issue = await prismaDB.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!issue) {
    return NextResponse.json({ error: 'Issue not found' }, { status: 404 });
  }

  const updatedIssue = await prismaDB.issue.update({
    where: {
      id: parseInt(params.id),
    },
    data: {
      title,
      description,
      status,
      assignedToUserId,
    },
  });

  return NextResponse.json(updatedIssue, { status: 201 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: 'Not Authorized' }, { status: 401 });

  const issue = await prismaDB.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue)
    return NextResponse.json({ error: 'Invalid issue' }, { status: 404 });

  await prismaDB.issue.delete({
    where: { id: issue.id },
  });

  return NextResponse.json({});
}
