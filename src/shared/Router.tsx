import React from 'react';
import { Route, Switch } from 'react-router';

import { IssueFormMobx } from '#shared/organisms/issue-form';
import { IssueInfoMobx } from '#shared/organisms/issue-info';
import { Dashboard } from '#shared/pages/dashboard';
import { Home } from '#shared/pages/home';
import { NotFound } from '#shared/pages/not-found';
import { DASHBOARD, HOME, ISSUE } from './constants';

export const routes = [
  {
    path: HOME,
    exact: true,
  },
  {
    path: DASHBOARD,
    exact: false,
  },
  {
    path: `${ISSUE}/:id`,
    exact: true,
  },
];

const Router: React.SFC = ({ children }) => (
  <>
    <Switch>
      <Route exact path={HOME} component={Home} />
      <Route path={DASHBOARD} component={Dashboard} />
      <Route path="*" component={NotFound} />
    </Switch>
    <Route path="*/new-issue" component={IssueFormMobx} />
    <Route path={`*${ISSUE}/:id`} component={IssueInfoMobx} />
  </>
);

export default Router;
