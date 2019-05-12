import { ApolloClient } from 'apollo-boost';
import { RouterStore } from 'mobx-react-router';

import { ApolloSource } from './data-source';
import { IssuesStore } from './issues';

export interface Stores {
  routing?: RouterStore;
  issues?: IssuesStore;
  toObject(): any;
}

export const createStores = async (
  client: ApolloClient<any>,
  initial?: any
): Promise<Stores> => {
  const source = new ApolloSource(client);
  const routingStore = new RouterStore();
  const issuesStore = new IssuesStore(source, (initial || {}).issues);

  await issuesStore.init();

  return {
    routing: routingStore,
    issues: issuesStore,
    toObject() {
      return {
        routing: routingStore,
        issues: issuesStore.toObject(),
      };
    },
  };
};
