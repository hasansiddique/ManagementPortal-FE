import { createAction } from 'redux-act';

export const requestEmployeeCreation = createAction();
export const EmployeeCreationSuccess = createAction();
export const EmployeeCreationFailure = createAction();

export const requestFetchingEmployees = createAction();
export const EmployeeFetchingSuccess = createAction((employee) => ({
  employee,
}));
export const EmployeeFetchingFailure = createAction((err) => ({ err }));

export const requestEmployeeDeletion = createAction();
export const EmployeeDeletionSuccess = createAction();
export const EmployeeDeletionFailure = createAction();

export const requestSingleEmployee = createAction();
export const SingleEmployeeSuccess = createAction((employee) => ({ employee }));
export const SingleEmployeeFailure = createAction((err) => ({ err }));

export const requestUpdateEmployee = createAction();
export const EmployeeUpdateSuccess = createAction();
export const EmployeeUpdateFailure = createAction();
