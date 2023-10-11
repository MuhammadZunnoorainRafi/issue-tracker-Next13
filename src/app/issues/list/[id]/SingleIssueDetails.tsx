import { IssueStatusBadge } from '@/components';
import { Issue } from '@prisma/client';
import { Heading, Flex, Card, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';

function SingleIssueDetails({ issue }: { issue: Issue }) {
  return (
    <div>
      {' '}
      <Heading>{issue.title}</Heading>
      <Flex gap="2" my="2">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card className="prose max-w-full" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
}

export default SingleIssueDetails;