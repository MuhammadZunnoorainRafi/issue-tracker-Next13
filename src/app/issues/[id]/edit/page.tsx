import React from 'react';
import { prismaDB } from '@/utils/prismaDB';
import { notFound } from 'next/navigation';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

const IssueForm = dynamic(() => import('@/app/issues/_component/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

async function EditIssuePage({ params }: { params: { id: string } }) {
  const issue = await prismaDB.issue.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
}

export default EditIssuePage;
