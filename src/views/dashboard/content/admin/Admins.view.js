import { Layout } from 'antd';
import React from 'react';

import ProtectedComponent from '../../../../components/ProtectedComponent';
import EmployeesView from './employees/Employees.container';
import EmployeeView from './employees/EmployeeDetails.view';

const { Content } = Layout;

const Admins = () => {
  return (
    <Content id="admins" className="content-wrapper">
      <ProtectedComponent
        path="/dashboard/admin/employees"
        Component={EmployeesView}
      />
      <ProtectedComponent
        path="/dashboard/admin/employee/:id"
        Component={EmployeeView}
      />
    </Content>
  );
};

export default Admins;
