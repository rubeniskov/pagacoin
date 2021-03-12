import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './configureStore';


const StoreProvider = ({ children, store = configureStore() }) => {
  return <Provider store={store} >{children}</Provider>
}
export default StoreProvider;
