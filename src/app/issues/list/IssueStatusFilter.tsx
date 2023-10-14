'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import React from 'react';

function IssueStatusFilter() {
  const statuses: { label: string; value?: Status | '-' }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
  ];

  return (
    <Select.Root>
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((items) => (
          <Select.Item key={items.value} value={items.value || '-'}>
            {items.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

export default IssueStatusFilter;
