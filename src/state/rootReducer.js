import { combineReducers } from 'redux-immutable';

import auth from '../views/auth/auth.reducer';
import dashboard from '../views/dashboard/dashboard.reducer'
import employee from '../views/employee/Employee.reducer';

const rootReducer = combineReducers({
  auth,
  dashboard,
  employee,
});

export default rootReducer;
