import { Map } from 'immutable';
import { createReducer } from 'redux-act';

import {
  requestEmployeeCreation,
  EmployeeCreationSuccess,
  EmployeeCreationFailure,

  requestFetchingEmployees,
  EmployeeFetchingSuccess,
  EmployeeFetchingFailure,

  requestEmployeeDeletion,
  EmployeeDeletionSuccess,
  EmployeeDeletionFailure,

  requestSingleEmployee,
  SingleEmployeeSuccess,
  SingleEmployeeFailure,

  requestUpdateEmployee,
  EmployeeUpdateSuccess,
  EmployeeUpdateFailure,

} from './dashboard.actions';

import {
  CREATING,
  CREATED,
  FAILURE,
  FETCHING,
  FETCHED,
  DELETED,
  DELETING,
  UPDATING,
  UPDATED,
} from '../../common/constants';

const defaultState = Map({
  employee: [],
  loading: true,
  error: null,
  isFetching: '',
  isFetched: false,
  isCreating: '',
  isCreatingSuccess: false,
  isDeleting: '',
  isDeletingSuccess: false,
  singleEmployee: '',
  isUpdating: '',
  isUpdated: false,

});

const reducer = createReducer({
  [requestEmployeeCreation]: (state) => {
    return state
      .set('isCreating', CREATING)
      .set('isCreatingSuccess', false);
  },
  [EmployeeCreationSuccess]: (state) => {
    return state
      .set('isCreating', CREATED)
      .set('isCreatingSuccess', true);
  },
  [EmployeeCreationFailure]: (state) => {
    return state
      .set('isCreating', FAILURE)
      .set('isCreatingSuccess', false);
  },
  [requestFetchingEmployees]: (state) => {
    return state
      .set('isFetching', FETCHING)
      .set('loading', true)
      .set('employee', [])
      .set('error', null)
      .set('isFetched', false);
  },
  [EmployeeFetchingSuccess]: (state, action) => {
    return state
      .set('isFetching', FETCHED)
      .set('loading', false)
      .set('employee', action.employee)
      .set('error', null)
      .set('isFetched', true);
  },
  [EmployeeFetchingFailure]: (state, action) => {
    return state
      .set('isFetching', FAILURE)
      .set('loading', false)
      .set('employee', [])
      .set('error', action.err)
      .set('isFetched', false);
  },
  [requestEmployeeDeletion]: (state) => {
    return state
      .set('isDeleting', DELETING)
      .set('isDeletingSuccess', false);
  },
  [EmployeeDeletionSuccess]: (state) => {
    return state
      .set('isDeleting', DELETED)
      .set('isDeletingSuccess', true);
  },
  [EmployeeDeletionFailure]: (state) => {
    return state
      .set('isDeleting', FAILURE)
      .set('isDeletingSuccess', false);
  },
  [requestSingleEmployee]: (state) => {
    return state
      .set('isFetching', FETCHING)
      .set('singleEmployee', null)
      .set('error', null);
  },
  [SingleEmployeeSuccess]: (state, action) => {
    return state
      .set('isFetching', FETCHED)
      .set('singleEmployee', action.employee)
      .set('error', null);
  },
  [SingleEmployeeFailure]: (state, action) => {
    return state
      .set('isFetching', FAILURE)
      .set('singleEmployee', null)
      .set('error', action.err);
  },
  [requestUpdateEmployee]: (state) => {
    return state
      .set('isUpdating', UPDATING)
      .set('isUpdated', false);
  },
  [EmployeeUpdateSuccess]: (state) => {
    return state
      .set('isUpdating', UPDATED)
      .set('isUpdated', true)
      .set('singleEmployee', null);
  },
  [EmployeeUpdateFailure]: (state) => {
    return state
      .set('isUpdating', FAILURE)
      .set('isUpdated', false);
  },
}, defaultState);

export default reducer;
