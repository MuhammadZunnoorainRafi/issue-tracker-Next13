import { prismaDB } from '@/utils/prismaDB';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import SingleIssueDetails from './SingleIssueDetails';
import DeleteIssueButton from './DeleteIssueButton';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import { getServerSession } from 'next-auth';
import AssigneeSelect from './AssigneeSelect';
import { cache } from 'react';

type Props = {
  params: { id: string };
};

const getIssues = cache((issueId: number) =>
  prismaDB.issue.findUnique({
    where: {
      id: issueId,
    },
  })
);

async function IssueDetails({ params }: Props) {
  const singleIssue = await getIssues(parseInt(params.id));

  if (!singleIssue) notFound();

  const session = await getServerSession(authOptions);

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <SingleIssueDetails issue={singleIssue} />
      </Box>
      {session && (
        <Box>
          <Flex direction="column" gap="2">
            <AssigneeSelect issue={singleIssue} />
            <EditIssueButton singleIssueId={singleIssue.id} />
            <DeleteIssueButton singleIssueId={singleIssue.id} />
          </Flex>
        </Box>
      )}
    </Grid>
  );
}

export async function generateMetadata({ params }: Props) {
  const issue = await getIssues(parseInt(params.id));
  return {
    title: issue?.title,
    description: 'Details of issue ' + issue?.id,
  };
}

export default IssueDetails;
