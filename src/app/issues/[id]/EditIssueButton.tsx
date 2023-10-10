import { Pencil2Icon } from '@radix-ui/react-icons';
import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

function EditIssueButton({ singleIssueId }: { singleIssueId: number }) {
  return (
    <Button>
      <Pencil2Icon />
      <Link href={`/issues/${singleIssueId}/edit`}>Edit Issue</Link>
    </Button>
  );
}

export default EditIssueButton;
