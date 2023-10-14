import { IssueStatusBadge, IssuesAction, RadixLink } from '@/components';
import { prismaDB } from '@/utils/prismaDB';
import { Status } from '@prisma/client';
import { Table } from '@radix-ui/themes';

async function Issues({ searchParams }: { searchParams: { status: Status } }) {
  const statuses = Object.values(Status);
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;
  const issues = await prismaDB.issue.findMany({
    where: {
      status,
    },
  });

  return (
    <div>
      <IssuesAction />
      <div>
        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
              <Table.ColumnHeaderCell>Label</Table.ColumnHeaderCell>
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
    </div>
  );
}
export const dynamic = 'force-dynamic';

export default Issues;
