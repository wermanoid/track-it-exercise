import Closed from '@material-ui/icons/OfflinePin';
import Problem from '@material-ui/icons/ReportProblem';
import Schedule from '@material-ui/icons/Schedule';

import { IssueState, IssueStatus } from './types';

export const HOME = '/';
export const DASHBOARD = '/dashboard';
export const ISSUE = '/issue';

export const IssueStatuses: Record<IssueState, IssueStatus> = {
  [IssueState.OPEN]: {
    status: IssueState.OPEN,
    label: 'Open',
    icon: Problem,
  },
  [IssueState.PENDING]: {
    status: IssueState.PENDING,
    label: 'Pending',
    icon: Schedule,
  },
  [IssueState.CLOSED]: {
    status: IssueState.CLOSED,
    label: 'Closed',
    icon: Closed,
  },
};
