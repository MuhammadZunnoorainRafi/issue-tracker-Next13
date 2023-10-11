import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

function IssuesAction() {
  return (
    <div className="mb-4 inline-block">
      <Link href="/issues/new">
        <Button color="violet">New Issue</Button>
      </Link>
    </div>
  );
}

export default IssuesAction;
