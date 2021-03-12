// Core
import React from 'react';
import ReactDOM from 'react-dom';
// Providers
import StylesProvider from './styles/StylesProvider';
import StoreProvider from './store/StoreProvider';
import ApolloProvider from './apollo/ApolloProvider';
// Views
import ViewMain from './views/ViewMain';

const container = document.createElement('div');

container.setAttribute('style', 'min-height: 100vh;display: flex;flex-flow: column;');

ReactDOM.render(
  <StylesProvider>
    <StoreProvider>
      <ApolloProvider>
        <StoreProvider>
          <ViewMain />
        </StoreProvider>
      </ApolloProvider>
    </StoreProvider>
  </StylesProvider>, 
  document.body.appendChild(container));
