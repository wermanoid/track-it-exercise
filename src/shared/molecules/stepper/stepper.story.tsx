import { select } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

import { IssueState } from '#shared/types';

import { action } from '@storybook/addon-actions';
import Stepper from './stepper';

storiesOf('[Molecule]|Stepper', module).add('default', () => (
  <Stepper
    status={select(
      'State',
      {
        Open: IssueState.OPEN,
        Pending: IssueState.PENDING,
        Closed: IssueState.CLOSED,
      },
      IssueState.OPEN
    )}
    onNextStep={action('Next step')}
  />
));
