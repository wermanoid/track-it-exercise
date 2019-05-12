import { boolean, select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { IssueState } from '#shared/types';
import IssueAvatar from './issue-avatar';

storiesOf('[Atom]|IssueAvatar', module).add('default', () => {
  const hasStatus = boolean('Has status?', false);
  const props = {
    ...(hasStatus && {
      status: select<IssueState>(
        'State',
        {
          Open: IssueState.OPEN,
          Pending: IssueState.PENDING,
          Closed: IssueState.CLOSED,
        },
        IssueState.OPEN
      ),
    }),
  };
  return <IssueAvatar {...props}>K</IssueAvatar>;
});
