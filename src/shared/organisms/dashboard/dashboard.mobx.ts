import { inject, observer } from 'mobx-react';
import { SyntheticEvent } from 'react';

import { ISSUE } from '#shared/constants';

import { Omit } from '#shared/types';
import Dashboard, { DashboardProps } from './dashboard';

const DashboardMobx = inject(({ issues: issuesStore, routing }) => ({
  issues: issuesStore.issues || [],
  openIssue: (id: string) => (e: SyntheticEvent) => {
    e.preventDefault();
    routing.push(`${routing.location.pathname}${ISSUE}/${id}`);
  },
}))(
  observer(Dashboard as React.ComponentType<
    Omit<DashboardProps, 'issues' | 'openIssue'>
  >)
);

export default DashboardMobx;
