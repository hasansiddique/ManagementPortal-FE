import { connect } from 'react-redux';

import Admins from '../Admins.view';
import {
  createEmployee,
  getAllEmployees,
  deleteEmployee,
  getSingleEmployee,
  UpdateSingleEmployee,
} from './employees.api';

const mapStateToProps = (state) => ({
  isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
  employee: state.getIn(['dashboard', 'admin', 'employees', 'employee']),
  isCreatingSuccess: state.getIn([
    'dashboard',
    'admin',
    'employees',
    'isCreatingSuccess',
  ]),
  loading: state.getIn(['dashboard', 'admin', 'employees', 'loading']),
  isDeletingSuccess: state.getIn([
    'dashboard',
    'admin',
    'employees',
    'isDeletingSuccess',
  ]),
  singleEmployee: state.getIn([
    'dashboard',
    'admin',
    'employees',
    'singleEmployee',
  ]),
  isUpdated: state.getIn(['dashboard', 'admin', 'employees', 'isUpdated']),
});

const mapDispatchToProps = (dispatch) => ({
  createEmployee: (payload, file) => {
    dispatch(createEmployee(payload, file));
  },
  getAllEmployees: () => {
    dispatch(getAllEmployees());
  },
  deleteEmployee: (id) => {
    dispatch(deleteEmployee(id));
  },
  getSingleEmployee: (id) => {
    dispatch(getSingleEmployee(id));
  },
  updateSingleEmployee: (id, payload, file) => {
    dispatch(UpdateSingleEmployee(id, payload, file));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Admins);
