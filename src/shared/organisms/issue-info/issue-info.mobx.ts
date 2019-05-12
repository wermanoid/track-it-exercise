import { find, pick } from 'lodash/fp';
import { inject, observer } from 'mobx-react';

import IssueInfo from './issue-info';

const IssueInfoMobx = inject(({ issues: issuesStore, routing }, props: any) => {
  const onCancel = () => {
    if (routing.history.length === 2) {
      routing.push(`/${routing.location.pathname.split('/')[1] || ''}`);
      return;
    }
    routing.goBack();
  };

  const updateIssue = (update: any) => {
    issuesStore.updateIssue({
      ...pick(['status', 'title', 'description'], update),
      id: props.match.params.id,
    });
  };

  return {
    issue: find({ id: props.match.params.id }, issuesStore.issues),
    onCancel,
    updateIssue,
  };
})(observer(IssueInfo));

export default IssueInfoMobx;
