import { Layout } from 'antd';
import React from 'react';
import PropTypes from 'prop-types';

import ProtectedComponent from '../../../../components/ProtectedComponent';
import EmployeesView from './employees/Employees.container';
import EmployeeView from './employees/EmployeeDetails.view';

const { Content } = Layout;

const Admins = ({
  match,
  location,
}) => {
  return (
    <Content id="admins" className="content-wrapper">
      <ProtectedComponent
        path="/dashboard/admin/employees"
        Component={EmployeesView}
        match={match}
        location={location}
      />
      <ProtectedComponent
        path="/dashboard/admin/employee/:id"
        Component={EmployeeView}
        match={match}
        location={location}
      />
    </Content>
  );
};

Admins.defaultProps = {};

Admins.propTypes = {
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

Admins.styles = {};

export default Admins;
