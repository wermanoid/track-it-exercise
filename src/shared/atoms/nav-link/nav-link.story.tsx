import React from 'react';
import { AppBar, Tabs, Toolbar } from '@material-ui/core';
import { text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';

import NavLink from './nav-link';

storiesOf('[Atom]|NavLink', module)
  .addDecorator(story => (
    <MemoryRouter initialEntries={['/']}>
      <AppBar>
        <Toolbar>{story()}</Toolbar>
      </AppBar>
    </MemoryRouter>
  ))
  .add('default', () => (
    <Tabs variant="standard" value={0}>
      <NavLink href={text('Route 1', '/')} value={0}>
        {text('Content 1', 'Route 1')}
      </NavLink>
      <NavLink href={text('Route 2', '/')} value={1}>
        {text('Content 2', 'Route 2')}
      </NavLink>
    </Tabs>
  ));
