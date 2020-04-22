import { combineReducers } from 'redux-immutable';

import auth from '../views/auth/auth.reducer';

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
