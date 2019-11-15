import React from 'react';
// import { action } from '@storybook/addon-actions';
// import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { IssueState } from '#shared/types';
import { action } from '@storybook/addon-actions';
import Dashboard from './dashboard';

storiesOf('[Organism]|Dashboard', module).add('default', () => {
  const toOpen = action('Issue id:');
  const toOpenHandler = (x: string) => () => toOpen(x);
  return (
    <Dashboard
      openIssue={toOpenHandler}
      issues={[
        {
          id: 'ISS-1',
          title: 'Story issue 1',
          created: new Date().toISOString(),
          status: IssueState.OPEN,
        },
        {
          id: 'ISS-2',
          title: 'Story issue 2',
          created: new Date().toISOString(),
          status: IssueState.PENDING,
        },
        {
          id: 'ISS-3',
          title: 'Story issue 3',
          created: new Date().toISOString(),
          status: IssueState.CLOSED,
        },
      ]}
    />
  );
});
