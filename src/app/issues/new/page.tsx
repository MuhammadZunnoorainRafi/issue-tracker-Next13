import React from 'react';
import dynamic from 'next/dynamic';
import IssueFormSkeleton from '../_component/IssueFormSkeleton';

const IssueForm = dynamic(() => import('@/app/issues/_component/IssueForm'), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

function NewIssuePage() {
  return <IssueForm />;
}

export default NewIssuePage;
