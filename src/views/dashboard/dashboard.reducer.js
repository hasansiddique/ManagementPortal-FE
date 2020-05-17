import { combineReducers } from 'redux-immutable';

import user from './content/user/user.reducer';
import admin from './content/admin/admin.reducer';

const reducers = combineReducers({
  user,
  admin,
});

export default reducers;
