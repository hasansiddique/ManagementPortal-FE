import { combineReducers } from 'redux-immutable';

import employees from './employees/employees.reducer';

const reducers = combineReducers({
  employees,
});

export default reducers;
