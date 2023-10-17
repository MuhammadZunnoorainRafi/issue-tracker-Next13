import Pagination from '@/components/Pagination';
import LatestIssues from './LatestIssues';
import IssueSummary from './issues/list/IssueSummary';
import { prismaDB } from '@/utils/prismaDB';

export default async function Home() {
  const open = await prismaDB.issue.count({ where: { status: 'OPEN' } });
  const inProgress = await prismaDB.issue.count({
    where: { status: 'IN_PROGRESS' },
  });
  const closed = await prismaDB.issue.count({ where: { status: 'CLOSED' } });

  return (
    <div>
      <IssueSummary open={open} inProgress={inProgress} closed={closed} />
      <LatestIssues />
    </div>
  );
}
