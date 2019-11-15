import React from 'react';
import blue from '@material-ui/core/colors/blue';
import {
  createMuiTheme,
  ServerStyleSheets,
  ThemeProvider,
} from '@material-ui/core/styles';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import config from 'config';
import { find } from 'lodash/fp';
import { Provider } from 'mobx-react';
import fetch from 'node-fetch';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { matchPath, StaticRouter } from 'react-router';

import Application from '#shared/App';
import { routes } from '#shared/Router';
import { createStores } from '#shared/stores';

const themeMUI = {
  palette: {
    primary: blue,
  },
};

const port = Number(config.get('port'));

export const renderApp = async (url: string) => {
  // Create a sheetsRegistry instance.
  const sheets = new ServerStyleSheets();

  // Create a theme instance.
  const theme = createMuiTheme(themeMUI);

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
  const app = sheets.collect(
    <Provider {...stores}>
      <ApolloProvider client={client}>
        <ThemeProvider theme={theme}>
          <StaticRouter location={url}>
            <Application />
          </StaticRouter>
        </ThemeProvider>
      </ApolloProvider>
    </Provider>
  );

  await getDataFromTree(app);

  // Pegue o CSS do nosso sheetsRegistry.
  const css = () => sheets.toString();

  const status = find(r => matchPath(url, r), routes) ? 200 : 404;

  // Send the rendered page back to the client.
  return { app, css, status, stores, client };
};
