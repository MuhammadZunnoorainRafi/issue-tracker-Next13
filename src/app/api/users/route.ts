import { prismaDB } from '@/utils/prismaDB';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const res = await prismaDB.user.findMany();
  return NextResponse.json(res, { status: 200 });
}
