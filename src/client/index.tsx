import blue from '@material-ui/core/colors/blue';
import {
  createGenerateClassName,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { createBrowserHistory } from 'history';
import { Provider } from 'mobx-react';
import { syncHistoryWithStore } from 'mobx-react-router';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { hydrate } from 'react-dom';
import JssProvider from 'react-jss/lib/JssProvider';
import { Router } from 'react-router-dom';

import Application from '#shared/App';
import { createStores } from '#shared/stores';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache().restore((window as any).__APOLLO_STATE__),
});

class Main extends React.Component {
  public componentDidMount() {
    const jssStyles = document.getElementById('jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  public render() {
    return <Application />;
  }
}

const bootstrap = async () => {
  const stores = await createStores(client, (window as any).__INITIAL_STATE__);

  const theme = createMuiTheme({
    palette: {
      primary: blue,
    },
    typography: {
      useNextVariants: true,
    },
  });

  const generateClassName = createGenerateClassName();

  const browserHistory = createBrowserHistory();

  const history = syncHistoryWithStore(browserHistory, stores.routing!);

  hydrate(
    <Provider {...stores}>
      <ApolloProvider client={client}>
        <JssProvider generateClassName={generateClassName}>
          <MuiThemeProvider theme={theme}>
            <Router history={history}>
              <Main />
            </Router>
          </MuiThemeProvider>
        </JssProvider>
      </ApolloProvider>
    </Provider>,
    document.getElementById('react-root')
  );
};

bootstrap();
