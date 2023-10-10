import { prismaDB } from '@/utils/prismaDB';
import { Box, Grid } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import EditIssueButton from './EditIssueButton';
import SingleIssueDetails from './SingleIssueDetails';

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
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      <Box>
        <SingleIssueDetails issue={singleIssue} />
      </Box>
      <Box>
        <EditIssueButton singleIssueId={singleIssue.id} />
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
