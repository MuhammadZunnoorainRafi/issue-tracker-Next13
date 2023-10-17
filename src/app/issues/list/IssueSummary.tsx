import { Status } from '@prisma/client';
import { Card, Flex, Heading } from '@radix-ui/themes';
import Link from 'next/link';

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

function IssueSummary({ open, inProgress, closed }: Props) {
  interface Container {
    label: string;
    value: number;
    status: Status;
  }

  const container: Container[] = [
    { label: 'Open Issues', value: open, status: 'OPEN' },
    { label: 'In-progress Issues', value: inProgress, status: 'IN_PROGRESS' },
    { label: 'Closed Issues', value: closed, status: 'CLOSED' },
  ];

  return (
    <Flex gap="3">
      {container.map((status) => (
        <Card asChild key={status.status}>
          <Link href={`/issues/list?status=${status.status}`}>
            <Flex direction="column" gap="1">
              {status.label}
              <Heading size="5">{status.value}</Heading>
            </Flex>
          </Link>
        </Card>
      ))}
    </Flex>
  );
}

export default IssueSummary;
