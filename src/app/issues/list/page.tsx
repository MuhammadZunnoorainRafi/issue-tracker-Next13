import { IssuesAction } from '@/components';
import Pagination from '@/components/Pagination';
import { prismaDB } from '@/utils/prismaDB';
import { Issue, Status } from '@prisma/client';
import { Flex } from '@radix-ui/themes';
import IssueTable, { columnNames, issueQuery } from './IssueTable';
import { Metadata } from 'next';

async function Issues({ searchParams }: { searchParams: issueQuery }) {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames.includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: 'asc' }
    : undefined;

  const pageNum = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  const issues = await prismaDB.issue.findMany({
    where: {
      status,
    },
    orderBy,
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prismaDB.issue.count({ where: { status } });

  return (
    <Flex direction="column" gap="4">
      <IssuesAction />
      <IssueTable searchParams={searchParams} issues={issues} />
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={pageNum}
      />
    </Flex>
  );
}
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Issue Tracker - Issue List',
  description: 'View all project issues',
};

export default Issues;
