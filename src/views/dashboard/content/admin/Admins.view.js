import PropTypes from 'prop-types';
import { Layout } from 'antd';
import React from 'react';
import { Route } from 'react-router-dom';

import EmployeesView from './employees/Employees.view';

const { Content } = Layout;

const Admins = ({
  loading,
  employee,
  isUpdated,
  singleEmployee,
  deleteEmployee,
  createEmployee,
  getAllEmployees,
  isCreatingSuccess,
  isDeletingSuccess,
  getSingleEmployee,
  updateSingleEmployee,
}) => {
  return (
    <Content id="admins" className="content-wrapper">
      <Route
        path="/dashboard/admin/employees"
        render={() => (
          <EmployeesView
            loading={loading}
            onUpdate={isUpdated}
            employeeState={employee}
            Success={isCreatingSuccess}
            deletion={isDeletingSuccess}
            handleSubmit={createEmployee}
            handleDeletion={deleteEmployee}
            handleFetching={getAllEmployees}
            singleEmployeeState={singleEmployee}
            getSingleEmployee={getSingleEmployee}
            updateSingleEmployee={updateSingleEmployee}
          />
        )}
      />
    </Content>
  );
};

Admins.defaultProps = {};

Admins.propTypes = {
  loading: PropTypes.bool.isRequired,
  employee: PropTypes.array.isRequired,
  isUpdated: PropTypes.bool.isRequired,
  deleteEmployee: PropTypes.func.isRequired,
  createEmployee: PropTypes.func.isRequired,
  getAllEmployees: PropTypes.func.isRequired,
  singleEmployee: PropTypes.string.isRequired,
  isCreatingSuccess: PropTypes.bool.isRequired,
  isDeletingSuccess: PropTypes.bool.isRequired,
  getSingleEmployee: PropTypes.func.isRequired,
  updateSingleEmployee: PropTypes.func.isRequired,
};

Admins.styles = {};

export default Admins;
