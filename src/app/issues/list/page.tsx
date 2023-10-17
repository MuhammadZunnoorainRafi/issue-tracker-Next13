import { IssueStatusBadge, IssuesAction, RadixLink } from '@/components';
import Pagination from '@/components/Pagination';
import { prismaDB } from '@/utils/prismaDB';
import { Issue, Status } from '@prisma/client';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Flex, Table } from '@radix-ui/themes';
import Link from 'next/link';

const columns: { label: string; value: keyof Issue; className?: string }[] = [
  {
    label: 'Issue',
    value: 'title',
  },
  {
    label: 'Status',
    value: 'status',
    className: 'hidden md:table-cell',
  },
  {
    label: 'Created',
    value: 'createdAt',
    className: 'hidden md:table-cell',
  },
];

async function Issues({
  searchParams,
}: {
  searchParams: { status: Status; orderBy: keyof Issue; page: string };
}) {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columns
    .map((column) => column.value)
    .includes(searchParams.orderBy)
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
      <div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              {columns.map((column) => (
                <Table.ColumnHeaderCell
                  className={column.className}
                  key={column.value}
                >
                  <Link
                    href={{
                      query: { ...searchParams, orderBy: column.value },
                    }}
                  >
                    {column.label}
                    {searchParams.orderBy === column.value && (
                      <ArrowUpIcon className="inline" />
                    )}
                  </Link>
                </Table.ColumnHeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {issues.map((val) => {
              return (
                <Table.Row key={val.id}>
                  <Table.Cell>
                    <RadixLink href={`/issues/list/${val.id}`}>
                      {val.title}
                    </RadixLink>
                    <div className="block md:hidden">
                      <IssueStatusBadge status={val.status} />
                    </div>
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    <IssueStatusBadge status={val.status} />
                  </Table.Cell>
                  <Table.Cell className="hidden md:table-cell">
                    {val.createdAt.toDateString()}
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
      </div>
      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={pageNum}
      />
    </Flex>
  );
}
export const dynamic = 'force-dynamic';

export default Issues;
