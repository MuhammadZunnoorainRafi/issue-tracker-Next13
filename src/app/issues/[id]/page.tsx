import { prismaDB } from '@/utils/prismaDB';
import { Box, Flex, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import SingleIssueDetails from './SingleIssueDetails';
import DeleteIssueButton from './DeleteIssueButton';

type Props = {
  params: { id: string };
};

async function IssueDetails({ params }: Props) {
  const singleIssue = await prismaDB.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!singleIssue) notFound();

  return (
    <Grid columns={{ initial: '1', sm: '5' }} gap="5">
      <Box className="md:col-span-4">
        <SingleIssueDetails issue={singleIssue} />
      </Box>
      <Box>
        <Flex direction="column" gap="2">
          <EditIssueButton singleIssueId={singleIssue.id} />
          <DeleteIssueButton singleIssueId={singleIssue.id} />
        </Flex>
      </Box>
    </Grid>
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
