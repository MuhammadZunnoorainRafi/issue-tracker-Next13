import { Button, Flex } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';
import IssueStatusFilter from './IssueStatusFilter';

function IssuesAction() {
  return (
    <Flex mb="5" justify="between">
      <IssueStatusFilter />
      <Link href="/issues/new">
        <Button color="violet">New Issue</Button>
      </Link>
    </Flex>
  );
}

export default IssuesAction;
