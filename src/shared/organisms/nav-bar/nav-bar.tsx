// import AppBar from '@material-ui/core/AppBar';
// import Button from '@material-ui/core/Button';
// import Tabs from '@material-ui/core/Tabs';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Add from '@material-ui/icons/Add';
// import { inject, observer } from 'mobx-react';
// import { RouterStore } from 'mobx-react-router';
// import React from 'react';
// import { useTheme } from '@material-ui/core/styles';
// import useMediaQuery from '@material-ui/core/useMediaQuery';

// import NavLink from '#shared/atoms/nav-link';
// import { DASHBOARD, HOME } from '#shared/constants';

// export interface NavBarProps {
//   title: string;
//   routing?: RouterStore;
// }

// interface NavBarState {
//   activeRoute: string;
// }

// const viewport = {
//   width: '100%',
//   maxWidth: '1200px',
//   marginLeft: 'auto',
//   marginRight: 'auto',
// };

// @inject('routing')
// @observer
// class NavBar extends React.Component<NavBarProps, NavBarState> {
//   public state: NavBarState = {
//     activeRoute: (this.props.routing!.location || {}).pathname,
//   };

//   public render() {
//     console.log(this.props);
//     const { title } = this.props;
//     const isDashboard = /^\/dashboard.*/.test(
//       this.props.routing!.location.pathname
//     );

//     return (
//       <AppBar position="static">
//         <Toolbar variant="dense" css={viewport}>
//           <Typography variant="h6" color="inherit">
//             <a
//               css={{
//                 color: 'white',
//                 textDecoration: 'none',
//                 marginRight: '24px',
//               }}
//               href="/"
//               onClick={this.handleTitleClick}
//             >
//               {title}
//             </a>
//           </Typography>
//           <Tabs
//             variant="standard"
//             value={isDashboard ? DASHBOARD : HOME}
//             onChange={this.handleLinkClick}
//           >
//             <NavLink href={HOME} value={HOME}>
//               Home
//             </NavLink>
//             <NavLink href={DASHBOARD} value={DASHBOARD}>
//               Dashboard
//             </NavLink>
//           </Tabs>
//           <Button color="secondary" onClick={this.handleNewIssue}>
//             <Add />
//             New issue
//           </Button>
//         </Toolbar>
//       </AppBar>
//     );
//   }

//   private handleNewIssue = () => {
//     const { activeRoute } = this.state;
//     this.props.routing!.push(`${activeRoute}/new-issue`.replace('//', '/'));
//   };

//   private handleTitleClick = (e: React.SyntheticEvent<{}>) => {
//     e.preventDefault();
//     this.handleLinkClick(e, HOME);
//   };

//   private handleLinkClick = (event: React.ChangeEvent<{}>, value: string) => {
//     const { activeRoute } = this.state;
//     if (activeRoute !== value) {
//       this.setState({ activeRoute: value }, () => {
//         this.props.routing!.push(value);
//       });
//     }
//   };
// }

// export default NavBar;

import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {
  Tab,
  Tabs,
  List,
  AppBar,
  Drawer,
  Toolbar,
  Divider,
  ListItem,
  IconButton,
  Typography,
} from '@material-ui/core';
import { Image, Menu, Close } from '@material-ui/icons';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

const MobileBar = ({ title }) => (
  <>
    <IconButton color="inherit">
      <Menu />
    </IconButton>
    <Typography variant="h6" noWrap>
      {title}
    </Typography>
    <Drawer open>
      <div css={{ width: '250px', display: 'flex', paddingLeft: '1rem' }}>
        <Typography variant="h4" css={{ flex: 1 }}>
          Navigation
        </Typography>
        <IconButton>
          <Close />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem>One</ListItem>
        <ListItem>Two</ListItem>
      </List>
    </Drawer>
  </>
);

const DesktopBar = ({ title }) => (
  <>
    <IconButton color="inherit">
      <Image />
    </IconButton>
    <Typography variant="h6" noWrap>
      {title}
    </Typography>
    <Tabs variant="standard" value={1}>
      <Tab value={1} label="One" />
      <Tab value={2} label="Two" />
    </Tabs>
  </>
);

const NavBar = ({ title = 'TestApp' }) => {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down('xs'));
  return (
    <AppBar position="static">
      <Toolbar
        variant="dense"
        css={{ maxWidth: '1280px', margin: 'auto', width: '100%' }}
      >
        {matches ? <MobileBar title={title} /> : <DesktopBar title={title} />}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
