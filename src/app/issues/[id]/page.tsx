import { IssueStatusBadge } from '@/components';
import { prismaDB } from '@/utils/prismaDB';
import { Card, Flex, Heading, Text } from '@radix-ui/themes';
import ReactMarkdown from 'react-markdown';

type Props = {
  params: { id: string };
};

async function IssueDetails({ params }: Props) {
  const singleIssue = await prismaDB.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  return (
    <Flex direction="column">
      <Heading>{singleIssue?.title}</Heading>
      <Flex gap="2" my="2">
        <IssueStatusBadge status={singleIssue!.status} />
        <Text>{singleIssue?.createdAt.toDateString()}</Text>
      </Flex>
      <Card className=" prose max-w-full" mt="4">
        <ReactMarkdown>{singleIssue?.description}</ReactMarkdown>
      </Card>
    </Flex>
  );
}

export async function generateMetadata({ params }: Props) {
  const issue = await prismaDB.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });
  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id,
  };
}

export default IssueDetails;
