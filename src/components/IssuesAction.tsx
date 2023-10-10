import { Button } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

function IssuesAction() {
  return (
    <div>
      <Link className=" cursor-pointer" href="/issues/new">
        <Button color="violet">New Issue</Button>
      </Link>
    </div>
  );
}

export default IssuesAction;
