'use client';
import { Status } from '@prisma/client';
import { Select } from '@radix-ui/themes';
import { useRouter, useSearchParams } from 'next/navigation';

function IssueStatusFilter() {
  const statuses: { label: string; value?: Status | '-' }[] = [
    { label: 'All', value: '-' },
    { label: 'Open', value: 'OPEN' },
    { label: 'In progress', value: 'IN_PROGRESS' },
    { label: 'Closed', value: 'CLOSED' },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  return (
    <Select.Root
      defaultValue={searchParams.get('status') || ''}
      onValueChange={(status) => {
        const sParams = new URLSearchParams();
        if (status) sParams.append('status', status);
        if (searchParams.get('orderBy'))
          sParams.append('orderBy', searchParams.get('orderBy')!);
        const query =
          sParams.size && status !== '-' ? '?' + sParams.toString() : '';
        router.push(`/issues/list` + query);
      }}
    >
      <Select.Trigger placeholder="Filter by status..." />
      <Select.Content>
        {statuses.map((items) => (
          <Select.Item key={items.value} value={items.value!}>
            {items.label}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}

export default IssueStatusFilter;
