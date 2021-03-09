import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloLink, HttpLink, from, concat, InMemoryCache } from '@apollo/client';
import AlpsLink from './apollo/AlpsLink';
import { ApolloProvider } from '@apollo/client';
import { createGlobalStyle } from 'styled-components';
import { Provider as StoreProvider } from 'react-redux';
import Routes from './routes';
import configureStore from './store/configureStore';

const container = document.createElement('div');

container.setAttribute('style', 'min-height: 100vh;display: flex;flex-flow: column;');


const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

const store = configureStore();


const client = new ApolloClient({
  // uri: 'https://48p1r2roz4.sse.codesandbox.io',
  // link: new AlpsLink({
  //   uri: 'http://localhost:9966/api'
  // }),
  link: new HttpLink({ uri: 'https://48p1r2roz4.sse.codesandbox.io' }),
  // link: from([
    // new ApolloLink((operation, forward) => {
    //   operation.setContext({ start: new Date().getTime() });
    //   console.log(operation, forward);
    //   return forward(operation).map((data) => {
    //     // Called after server responds
    //     const time = new Date().getTime() - operation.getContext().start;
    //     console.log(`Operation ${operation.operationName} took ${time} to complete`);
    //     return data;
    //   });
    // }),
    // new AlpsLink({
    //   uri: 'http://localhost:8080'
    // }),
    // new HttpLink({ uri: 'https://48p1r2roz4.sse.codesandbox.io' })
  // ]),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <StoreProvider store={store}>
      <GlobalStyle />
      <Routes />
    </StoreProvider>
  </ApolloProvider>, document.body.appendChild(container));
