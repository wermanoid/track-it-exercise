import React from 'react';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Link from '@material-ui/core/Link';
import { map } from 'lodash/fp';

import IssueComponent from '#shared/molecules/issue';

import { Issue, Omit } from '#shared/types';

export interface DashboardProps {
  issues: Array<Omit<Issue, 'description'>>;
  openIssue: (id: string) => () => void;
}

const Dashboard: React.SFC<DashboardProps> = ({ issues, openIssue }) => (
  <GridList cellHeight={86} cols={3}>
    {map(
      (issue: Issue) => (
        <GridListTile cols={1} key={issue.id}>
          <Link
            href={`/issue/${issue.id}`}
            css={{ textDecoration: 'none', cursor: 'pointer' }}
            onClick={openIssue(issue.id)}
          >
            <IssueComponent {...issue} />
          </Link>
        </GridListTile>
      ),
      issues
    )}
  </GridList>
);

export default Dashboard;
