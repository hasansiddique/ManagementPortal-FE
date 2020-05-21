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
} from './employees.actions';

import {
  PENDING,
  CREATED,
  FAILURE,
  FETCHING,
  FETCHED,
  DELETED,
  DELETING,
  UPDATING,
  UPDATED,
} from '../../../../../common/constants';

const defaultState = Map({
  employees: [],
  employee: null,
  statusUpdate: '',
  loading: true,
  error: null,
});

const reducer = createReducer(
  {
    [requestEmployeeCreation]: (state) => {
      return state.set('statusUpdate', PENDING);
    },
    [EmployeeCreationSuccess]: (state) => {
      return state.set('statusUpdate', CREATED);
    },
    [EmployeeCreationFailure]: (state) => {
      return state.set('statusUpdate', FAILURE);
    },
    [requestFetchingEmployees]: (state) => {
      return state
        .set('statusUpdate', FETCHING)
        .set('loading', true)
        .set('employees', [])
        .set('error', null);
    },
    [EmployeeFetchingSuccess]: (state, action) => {
      return state
        .set('statusUpdate', FETCHED)
        .set('loading', false)
        .set('employees', action.employee)
        .set('error', null);
    },
    [EmployeeFetchingFailure]: (state, action) => {
      return state
        .set('statusUpdate', FAILURE)
        .set('loading', false)
        .set('employees', [])
        .set('error', action.err);
    },
    [requestEmployeeDeletion]: (state) => {
      return state.set('statusUpdate', DELETING);
    },
    [EmployeeDeletionSuccess]: (state) => {
      return state.set('statusUpdate', DELETED);
    },
    [EmployeeDeletionFailure]: (state) => {
      return state.set('statusUpdate', FAILURE);
    },
    [requestSingleEmployee]: (state) => {
      return state
        .set('statusUpdate', FETCHING)
        .set('employee', null)
        .set('error', null);
    },
    [SingleEmployeeSuccess]: (state, action) => {
      return state
        .set('statusUpdate', FETCHED)
        .set('employee', action.employee)
        .set('error', null);
    },
    [SingleEmployeeFailure]: (state, action) => {
      return state
        .set('statusUpdate', FAILURE)
        .set('employee', null)
        .set('error', action.err);
    },
    [requestUpdateEmployee]: (state) => {
      return state.set('statusUpdate', UPDATING);
    },
    [EmployeeUpdateSuccess]: (state) => {
      return state
        .set('statusUpdate', UPDATED);
    },
    [EmployeeUpdateFailure]: (state) => {
      return state.set('statusUpdate', FAILURE);
    },
  },
  defaultState,
);

export default reducer;
