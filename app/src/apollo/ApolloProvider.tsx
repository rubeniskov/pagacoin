import React from 'react';
import { ApolloProvider as Provider } from '@apollo/client';
import configureClient from './configureClient';

const ApolloProvider = ({ children, client = configureClient() }) => {
  return <Provider client={client} >{children}</Provider>
}

export default ApolloProvider;
