import request from '../../common/request';
import { HTTP_STATUS } from '../../common/constants';
import { openNotification } from '../../components/Notification';

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

} from './dashboard.actions'


export const createEmployee = (payload, file) => {
    const formData = new FormData();
    formData.append('file', file)
    formData.append('name', payload.name)
    formData.append('email', payload.email)
    formData.append('age', payload.age)
    formData.append('gender', payload.gender)
    formData.append('designation', payload.designation)
    formData.append('department', payload.department)
    formData.append('address', payload.address)
    console.log('from create employee', ...formData)
    return async (dispatch) => {
        dispatch(requestEmployeeCreation());

        try {
            const res = await request.post('/v1/employee/create', formData);
            dispatch(EmployeeCreationSuccess());
            if (res.status === HTTP_STATUS.CREATED){
                openNotification({
                    type: 'success',
                    title: 'Employee Created',
                    description: 'Employee Successfully Registered',
                });
            }
            return res;
        } catch (err) {
            dispatch(EmployeeCreationFailure());
            if (err.response.status === HTTP_STATUS.UNAUTHORIZED) {
                openNotification({
                    type: 'error',
                    title: 'User Login',
                    description: 'Invalid Login credentials!',
                });
            } else {
                openNotification({
                    type: 'error',
                    title: 'User Login',
                    description: 'Some thing went wrong while making the request',
                });
            }
            return null;
        }
    };
};

export const getAllEmployees = () => {
    return async (dispatch) => {
        dispatch(requestFetchingEmployees());
        try {
            const res = await request.get('/v1/employee/');
            dispatch(EmployeeFetchingSuccess(res.data || {}));
            return res;
        } catch (err) {
            dispatch(EmployeeFetchingFailure(err));
            if (err.response.status ===  HTTP_STATUS.UNAUTHORIZED ) {
                openNotification({
                    type: 'error',
                    title: 'User Login',
                    description: 'Invalid Login credentials!',
                });
            } else if (err.response.status === HTTP_STATUS.NOT_FOUND) {
                openNotification({
                    type: 'error',
                    title: 'Not Found',
                    description: 'Resource Not Found!',
                });
            } else {
                openNotification({
                    type: 'error',
                    title: 'User Login',
                    description: 'Some thing went wrong while making the request',
                });
            }
            return null;
        }
    }
}


export const deleteEmployee = (id) => {
    return async (dispatch) => {
        dispatch(requestEmployeeDeletion());
        try {
            const res = await request.delete(`/v1/employee/${id}`);
            dispatch(EmployeeDeletionSuccess());
            if (res.status === 200){
                openNotification({
                    type: 'success',
                    title: 'Employee Deleted',
                    description: 'Employee Successfully Deleted',
                });
            }
            return res;
        } catch (err) {
            dispatch(EmployeeDeletionFailure);
            if (err.response.status ===  HTTP_STATUS.UNAUTHORIZED ) {
                openNotification({
                    type: 'error',
                    title: 'User Login',
                    description: 'Invalid Login credentials!',
                });
            } else if (err.response.status === HTTP_STATUS.NOT_FOUND) {
                openNotification({
                    type: 'error',
                    title: 'Not Found',
                    description: 'Resource Not Found!',
                });
            } else {
                openNotification({
                    type: 'error',
                    title: 'User Login',
                    description: 'Some thing went wrong while making the request',
                });
            }
            return null;
        }
    }
}

export const getSingleEmployee = (id) => {
    return async (dispatch) => {
        dispatch(requestSingleEmployee());
        try {
            const res = await request.get(`/v1/employee/${id}`);
            dispatch(SingleEmployeeSuccess(res.data || {}));
            return res;
        } catch (err) {
            dispatch(SingleEmployeeFailure(err));
            if (err.response.status ===  HTTP_STATUS.UNAUTHORIZED ) {
                openNotification({
                    type: 'error',
                    title: 'User Login',
                    description: 'Invalid Login credentials!',
                });
            } else if (err.response.status === HTTP_STATUS.NOT_FOUND) {
                openNotification({
                    type: 'error',
                    title: 'Not Found',
                    description: 'Resource Not Found!',
                });
            } else {
                openNotification({
                    type: 'error',
                    title: 'User Login',
                    description: 'Some thing went wrong while making the request',
                });
            }
            return null;
        }
    }
}

export const UpdateSingleEmployee = (id, payload, file) => {
    const form = new FormData();
    form.append('file', file)
    form.append('name', payload.name)
    form.append('email', payload.email)
    form.append('age', payload.age)
    form.append('gender', payload.gender)
    form.append('designation', payload.designation)
    form.append('department', payload.department)
    form.append('address', payload.address)
    console.log('form', ...form)
    return async (dispatch) => {
        dispatch(requestUpdateEmployee());
        try {
            const res = await request.put(`/v1/employee/${id}`, form);
            dispatch(EmployeeUpdateSuccess());
            if (res.status === 200){
                openNotification({
                    type: 'success',
                    title: 'Employee Updated',
                    description: 'Employee Successfully Updated',
                });
            }
            return res;
        } catch (err) {
            dispatch(EmployeeUpdateFailure());
            if (err.response.status ===  HTTP_STATUS.UNAUTHORIZED ) {
                openNotification({
                    type: 'error',
                    title: 'User Login',
                    description: 'Invalid Login credentials!',
                });
            } else if (err.response.status === HTTP_STATUS.NOT_FOUND) {
                openNotification({
                    type: 'error',
                    title: 'Not Found',
                    description: 'Resource Not Found!',
                });
            } else {
                openNotification({
                    type: 'error',
                    title: 'User Login',
                    description: 'Some thing went wrong while making the request',
                });
            }
            return null;
        }
    }
}
