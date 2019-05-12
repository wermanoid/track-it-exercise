import { ApolloServer } from 'apollo-server-express';

import { resolvers, typeDefs } from './schema';

const server = new ApolloServer({
  // These will be defined for both new or existing servers
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

export { server as graphQl };
