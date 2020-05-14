import { Map } from 'immutable';
import { createReducer } from 'redux-act';

import {
  requestEmployeeRecord,
  EmployeeRecordSuccess,
  EmployeeRecordFailure,
}
  from './Employee.actions';

import {
  FETCHED,
  FETCHING,
  FAILURE,
} from '../../common/constants';


const defaultState = Map({
  record: null,
  error: null,
  isFetching: '',
  isFetched: false,
});

const reducer = createReducer({
  [requestEmployeeRecord]: (state) => {
    return state
      .set('isFetching', FETCHING)
      .set('error', null)
      .set('record', null)
      .set('isFetched', false);
  },
  [EmployeeRecordSuccess]: (state, action) => {
    return state
      .set('isFetching', FETCHED)
      .set('error', null)
      .set('record', action.record)
      .set('isFetched', true);
  },
  [EmployeeRecordFailure]: (state, action) => {
    return state
      .set('isFetching', FAILURE)
      .set('error', action.err)
      .set('record', null)
      .set('isFetched', false);
  },
}, defaultState);

export default reducer;
