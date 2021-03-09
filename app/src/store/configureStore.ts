import { createStore } from 'redux';

const configureStore = () => {
  return createStore((state, action) => state);
}

export default configureStore;
