import { ApolloClient, InMemoryCache } from '@apollo/client';
import AlpsLink from './AlpsLink';

import schema from './schema';
import resolvers from './resolvers';

const configureClient = () => {
  return new ApolloClient({
    link: new AlpsLink({
      uri: 'http://localhost:9966/api',
      schema,
      resolvers,
    }),
    cache: new InMemoryCache()
  })
}

export default configureClient;
