import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import { inject, observer } from 'mobx-react';
import { RouterStore } from 'mobx-react-router';
import React from 'react';

import NavLink from '#shared/atoms/nav-link';
import { DASHBOARD, HOME } from '#shared/constants';

export interface NavBarProps {
  title: string;
  routing?: RouterStore;
}

interface NavBarState {
  activeRoute: string;
}

@inject('routing')
@observer
class NavBar extends React.Component<NavBarProps, NavBarState> {
  public state: NavBarState = {
    activeRoute: (this.props.routing!.location || {}).pathname,
  };

  public render() {
    const { title } = this.props;
    const isDashboard = /^\/dashboard.*/.test(
      this.props.routing!.location.pathname
    );

    return (
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit">
            <a
              css={{
                color: 'white',
                textDecoration: 'none',
                marginRight: '24px',
              }}
              href="/"
              onClick={this.handleTitleClick}
            >
              {title}
            </a>
          </Typography>
          <Tabs
            variant="standard"
            value={isDashboard ? DASHBOARD : HOME}
            onChange={this.handleLinkClick}
          >
            <NavLink href={HOME} value={HOME}>
              Home
            </NavLink>
            <NavLink href={DASHBOARD} value={DASHBOARD}>
              Dashboard
            </NavLink>
          </Tabs>
          <Button color="secondary" onClick={this.handleNewIssue}>
            <Add />
            New issue
          </Button>
        </Toolbar>
      </AppBar>
    );
  }

  private handleNewIssue = () => {
    const { activeRoute } = this.state;
    this.props.routing!.push(`${activeRoute}/new-issue`.replace('//', '/'));
  };

  private handleTitleClick = (e: React.SyntheticEvent<{}>) => {
    e.preventDefault();
    this.handleLinkClick(e, HOME);
  };

  private handleLinkClick = (event: React.ChangeEvent<{}>, value: string) => {
    const { activeRoute } = this.state;
    if (activeRoute !== value) {
      this.setState({ activeRoute: value }, () => {
        this.props.routing!.push(value);
      });
    }
  };
}

export default NavBar;
