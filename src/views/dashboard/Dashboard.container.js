import { connect } from 'react-redux';

import Dashboard from './view/Dashboard.view';
import { createEmployee, getAllEmployees, deleteEmployee, getSingleEmployee, UpdateSingleEmployee } from './dashboard.api'

const mapStateToProps = (state) => ({
    isAuthenticated: state.getIn(['auth', 'isAuthenticated']),
    employee: state.getIn(['dashboard', 'employee']),
    isCreatingSuccess: state.getIn(['dashboard', 'isCreatingSuccess']),
    loading: state.getIn(['dashboard', 'loading']),
    isDeletingSuccess: state.getIn(['dashboard', 'isDeletingSuccess']),
    singleEmployee: state.getIn(['dashboard', 'singleEmployee']),
    isUpdated: state.getIn(['dashboard', 'isUpdated']),
});

const mapDispatchToProps = (dispatch) => ({
  createEmployee: (payload, file) => {
    dispatch(createEmployee(payload, file));
  },
   getAllEmployees: () => {
    dispatch(getAllEmployees())
   },
    deleteEmployee: (id) => {
      dispatch(deleteEmployee(id))
    },
    getSingleEmployee: (id) => {
      dispatch(getSingleEmployee(id))
    },
    updateSingleEmployee: (id, payload, file) => {
      dispatch(UpdateSingleEmployee(id, payload, file))
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
