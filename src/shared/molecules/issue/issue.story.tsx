import { date, select, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { IssueState } from '#shared/types';
import Issue from './issue';

storiesOf('[Molecule]|Issue', module).add('default', () => (
  <Issue
    status={select(
      'State',
      {
        Open: IssueState.OPEN,
        Pending: IssueState.PENDING,
        Closed: IssueState.CLOSED,
      },
      IssueState.OPEN
    )}
    id={text('Id', 'ISS-1')}
    title={text('Title', 'example')}
    created={date('Created at')}
  />
));
