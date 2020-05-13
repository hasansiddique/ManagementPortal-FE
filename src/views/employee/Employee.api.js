import request from '../../common/request';
import {HTTP_STATUS} from "../../common/constants";
import {openNotification} from "../../components/Notification";

import {
    requestEmployeeRecord,
    EmployeeRecordSuccess,
    EmployeeRecordFailure,

} from './Employee.actions'
import get from "lodash/get";
import storage from "../../common/storage";



export const getEmployeeRecord = () => {
    return async (dispatch) => {
        dispatch(requestEmployeeRecord())
        try {
            const userId = get(storage.get('user'), 'user.id');
            const res = await request.get(`/v1/employee/${userId}/record`);
            dispatch(EmployeeRecordSuccess(res.data || {}));
            return res;
        } catch (err) {
            dispatch(EmployeeRecordFailure(err))
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
