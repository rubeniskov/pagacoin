import { ApolloLink } from '@apollo/client/core';
import { createAlpsLink, AlpsOptions } from './createAlpsLink';

class AlpsLink extends ApolloLink {
  constructor(public options: AlpsOptions = {}) {
    super(createAlpsLink(options).request);
  }
}

export default AlpsLink;
