import { connect } from 'react-redux';

import Employee from './User.view';
import { getEmployeeRecord } from './user.api';

const mapStateToProps = (state) => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  isFetched: state.getIn(['employee', 'isFetched']),
  record: state.getIn(['employee', 'record']),
});

const mapDispatchToProps = (dispatch) => ({
  getEmployeeRecord: () => {
    dispatch(getEmployeeRecord());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Employee);
