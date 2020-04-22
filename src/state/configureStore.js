import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './rootReducer';

const logger = createLogger();
const configureStore = (predefinedState) => {
  return createStore(
    reducers,
    predefinedState,
    applyMiddleware(
      logger,
      thunk,
    ),
  );
};

export default configureStore;
