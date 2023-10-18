import Pagination from '@/components/Pagination';
import LatestIssues from './LatestIssues';
import IssueSummary from './issues/list/IssueSummary';
import { prismaDB } from '@/utils/prismaDB';
import IssueChart from './issues/list/IssueChart';
import { Flex, Grid } from '@radix-ui/themes';

export default async function Home() {
  const open = await prismaDB.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prismaDB.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prismaDB.issue.count({ where: { status: 'CLOSED' } });

  return (
    <Grid columns={{ initial: '1', md: '2' }} gap="5">
      {/* <Flex direction="column" gap="5">
        <IssueSummary open={open} inProgress={inProgress} closed={closed} />
        <IssueChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <LatestIssues /> */}
    </Grid>
  );
}
