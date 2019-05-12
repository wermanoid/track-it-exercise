import blue from '@material-ui/core/colors/blue';
import {
  createGenerateClassName,
  createMuiTheme,
  MuiThemeProvider,
} from '@material-ui/core/styles';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import config from 'config';
import { SheetsRegistry } from 'jss';
import { find } from 'lodash/fp';
import { Provider } from 'mobx-react';
import fetch from 'node-fetch';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import JssProvider from 'react-jss/lib/JssProvider';
import { matchPath, StaticRouter } from 'react-router';

import Application from '#shared/App';
import { routes } from '#shared/Router';
import { createStores } from '#shared/stores';

const themeMUI = {
  palette: {
    primary: blue,
  },
  typography: {
    useNextVariants: true,
  },
};

const port = Number(config.get('port'));

export const renderApp = async (url: string) => {
  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a sheetsManager instance.
  const sheetsManager = new Map();

  // Create a theme instance.
  const theme = createMuiTheme(themeMUI);

  // Create a new class name generator.
  const generateClassName = createGenerateClassName();

  const client = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: createHttpLink({
      uri: `http://localhost:${port}/graphql`,
      fetch,
    } as any),
    cache: new InMemoryCache(),
  });

  const stores = await createStores(client);

  stores.routing!.location = {
    search: '',
    state: '',
    hash: '',
    pathname: url,
  };

  // Render the component to a string.
  const app = (
    <Provider {...stores}>
      <ApolloProvider client={client}>
        <JssProvider
          registry={sheetsRegistry}
          generateClassName={generateClassName}
        >
          <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
            <StaticRouter location={url}>
              <Application />
            </StaticRouter>
          </MuiThemeProvider>
        </JssProvider>
      </ApolloProvider>
    </Provider>
  );

  await getDataFromTree(app);

  // Pegue o CSS do nosso sheetsRegistry.
  const css = sheetsRegistry;

  const status = find(r => matchPath(url, r), routes) ? 200 : 404;

  // Send the rendered page back to the client.
  return { app, css, status, stores, client };
};
