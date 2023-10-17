import { Table } from '@radix-ui/themes';
import React from 'react';
import Link from 'next/link';
import { IssueStatusBadge, RadixLink } from '@/components';
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Issue, Status } from '@prisma/client';

export interface issueQuery {
  status: Status;
  orderBy: keyof Issue;
  page: string;
}

interface Props {
  searchParams: issueQuery;
  issues: Issue[];
}

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

export const columnNames = columns.map((column) => column.value);

function IssueTable({ searchParams, issues }: Props) {
  return (
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
  );
}

export default IssueTable;
