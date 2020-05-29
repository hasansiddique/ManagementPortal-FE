import { connect } from 'react-redux';
import EmployeesView from './Employees.view';

import {
  createEmployee,
  employees,
  deleteEmployee,
  employee,
  UpdateEmployee,
} from './employees.api';

const mapStateToProps = (state) => ({
  loading: state.getIn(['dashboard', 'admin', 'employees', 'loading']),
  employees: state.getIn(['dashboard', 'admin', 'employees', 'employees']),
  statusUpdate: state.getIn(['dashboard', 'admin', 'employees', 'statusUpdate']),
  employee: state.getIn(['dashboard', 'admin', 'employees', 'employee']),
});

const mapDispatchToProps = (dispatch) => ({
  createEmployee: (payload, file) => {
    dispatch(createEmployee(payload, file));
  },
  getAllEmployees: () => {
    dispatch(employees());
  },
  deleteEmployee: (id) => {
    dispatch(deleteEmployee(id));
  },
  getSingleEmployee: (id) => {
    dispatch(employee(id));
  },
  updateEmployee: (id, payload, file) => {
    dispatch(UpdateEmployee(id, payload, file));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesView);
