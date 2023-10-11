import React from 'react';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from './loading';

const IssueForm = dynamic(() => import('@/app/issues/_component/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

function NewIssuePage() {
  return <IssueForm />;
}

export default NewIssuePage;
