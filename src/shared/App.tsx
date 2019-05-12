import { css, Global } from '@emotion/core';
import { hot } from 'react-hot-loader/root';

import NavBar from './organisms/nav-bar';
import Routes from './Router';
import Layout from './templates/layout';

const globalStyles = css`
  body {
    margin: 0;
  }
`;

const Header = () => <NavBar title="TrackIt" />;

const App = () => (
  <Layout header={Header}>
    <Global styles={globalStyles} />
    <Routes />
  </Layout>
);

let Root = App;
if (process.env.NODE_ENV !== 'production') {
  Root = hot(App);
}

export default Root;
