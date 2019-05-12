import { inject, observer } from 'mobx-react';

import { CreateIssueArgs } from '#shared/types';
import IssueForm from './issue-form';

const IssueFormMobx = inject(({ issues: issuesStore, routing }) => {
  const onAddIssue = (issue: CreateIssueArgs) => {
    issuesStore.addNewIssue(issue);
    routing.goBack();
  };

  const onCancel = () => {
    if (routing.history.length === 2) {
      routing.push(`/${routing.location.pathname.split('/')[1] || ''}`);
      return;
    }
    routing.goBack();
  };

  return {
    onAddIssue,
    onCancel,
  };
})(observer((IssueForm as unknown) as React.ComponentType<{}>));

export default IssueFormMobx;
