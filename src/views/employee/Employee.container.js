import { connect } from 'react-redux';

import Employee from './view/Employee.view';
import { getEmployeeRecord } from './Employee.api';

const mapStateToProps = (state) => ({
    isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
    isFetched: state.getIn(['employee', 'isFetched']),
    record: state.getIn(['employee', 'record']),
})

const mapDispatchToProps = (dispatch) => ({
    getEmployeeRecord: () => {
        dispatch(getEmployeeRecord())
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
