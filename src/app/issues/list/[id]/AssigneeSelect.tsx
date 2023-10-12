'use client';
import { User } from '@prisma/client';
import { Select } from '@radix-ui/themes';

function AssigneeSelect() {
  return (
    <Select.Root>
      <Select.Trigger placeholder="Assign..." />
      <Select.Content>
        <Select.Group>
          <Select.Label>Users</Select.Label>
          <Select.Item value="1">bhoshyl@gmail.com</Select.Item>
        </Select.Group>
      </Select.Content>
    </Select.Root>
  );
}

export default AssigneeSelect;
