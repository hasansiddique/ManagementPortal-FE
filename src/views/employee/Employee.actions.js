import { createAction } from 'redux-act';

export const requestEmployeeRecord = createAction();
export const EmployeeRecordSuccess = createAction((record) => ({ record }));
export const EmployeeRecordFailure = createAction((err) => ({ err }));
